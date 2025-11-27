const PDFDocument = require("pdfkit");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const IncomeSession = require("../models/IncomeSession");

const width = 400; // reduced chart width for better fit
const height = 250; // reduced chart height for better fit
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

const generateSessionPDF = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Fetch session
    const session = await IncomeSession.findOne({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ error: "Income session not found" });
    }

    if (!session.isConcluded) {
      return res
        .status(400)
        .json({ error: "Cannot generate PDF for an ongoing session" });
    }

    const doc = new PDFDocument({ 
      size: "A4", 
      margin: 40,
      info: {
        Title: `Income Session Report - ${session._id}`,
        Author: 'Earnalyzer',
        Subject: 'Income Session Analysis'
      }
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=IncomeSession_${session._id}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Header with background
    doc
      .fillColor("#2E86AB")
      .rect(0, 0, doc.page.width, 80)
      .fill()
      .fillColor("white")
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("Earnalyzer - Income Session Report", 40, 30, { align: "center" })
      .fontSize(10)
      .text("Financial Analysis Report", 40, 55, { align: "center" });

    // Reset color for content
    doc.fillColor("black");

    // Session information in a neat layout
    const leftColumn = 50;
    const rightColumn = 300;
    let yPosition = 100;

    // Section title
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fillColor("#2E86AB")
      .text("Session Overview", leftColumn, yPosition)
      .fillColor("black");

    yPosition += 30;

    // Session details in two columns
    doc.fontSize(10).font("Helvetica");
    
    // Left column
    doc
      .font("Helvetica-Bold")
      .text("Session ID:", leftColumn, yPosition)
      .font("Helvetica")
      .text(session._id.toString(), leftColumn + 60, yPosition)
      
      .font("Helvetica-Bold")
      .text("Income Amount:", leftColumn, yPosition + 15)
      .font("Helvetica")
      .text(`$${parseFloat(session.incomeAmount).toFixed(2)}`, leftColumn + 80, yPosition + 15)
      
      .font("Helvetica-Bold")
      .text("Balance Remaining:", leftColumn, yPosition + 30)
      .font("Helvetica")
      .text(`$${parseFloat(session.balance).toFixed(2)}`, leftColumn + 95, yPosition + 30);

    // Right column
    doc
      .font("Helvetica-Bold")
      .text("User ID:", rightColumn, yPosition)
      .font("Helvetica")
      .text(session.user.toString().substring(0, 8) + "...", rightColumn + 45, yPosition)
      
      .font("Helvetica-Bold")
      .text("Date Created:", rightColumn, yPosition + 15)
      .font("Helvetica")
      .text(session.createdAt.toLocaleDateString(), rightColumn + 70, yPosition + 15)
      
      .font("Helvetica-Bold")
      .text("Status:", rightColumn, yPosition + 30)
      .font("Helvetica")
      .text("Concluded", rightColumn + 40, yPosition + 30);

    yPosition += 60;

    // Expenses section
    if (session.expenses.length > 0) {
      // Expenses list
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fillColor("#2E86AB")
        .text("Expenses Breakdown", leftColumn, yPosition)
        .fillColor("black");

      yPosition += 25;

      // Table headers
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("#", leftColumn, yPosition)
        .text("Expense Title", leftColumn + 30, yPosition)
        .text("Amount", leftColumn + 300, yPosition);

      yPosition += 5;
      // Line under header
      doc
        .moveTo(leftColumn, yPosition)
        .lineTo(leftColumn + 350, yPosition)
        .strokeColor("#CCCCCC")
        .lineWidth(1)
        .stroke();

      yPosition += 10;

      // Expense items
      doc.font("Helvetica").fontSize(9);
      session.expenses.forEach((expense, index) => {
        if (yPosition > 650) {
          // This shouldn't happen with our layout, but just in case
          return;
        }
        doc
          .text((index + 1).toString(), leftColumn, yPosition)
          .text(expense.title, leftColumn + 30, yPosition)
          .text(`$${parseFloat(expense.amount).toFixed(2)}`, leftColumn + 300, yPosition);
        
        yPosition += 15;
      });

      // Total expenses
      const totalExpenses = session.expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      yPosition += 10;
      doc
        .moveTo(leftColumn + 250, yPosition)
        .lineTo(leftColumn + 350, yPosition)
        .stroke();
      
      yPosition += 5;
      doc
        .font("Helvetica-Bold")
        .text("Total Expenses:", leftColumn + 250, yPosition)
        .text(`$${totalExpenses.toFixed(2)}`, leftColumn + 300, yPosition);

      yPosition += 30;

      // Generate charts
      const labels = session.expenses.map((e) => e.title);
      const data = session.expenses.map((e) => parseFloat(e.amount));

      // Pie Chart Configuration
      const pieConfig = {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#FF9800",
                "#9C27B0", "#00BCD4", "#E91E63", "#3F51B5", "#CDDC39",
                "#FF5722", "#795548", "#607D8B", "#4CAF50", "#2196F3"
              ],
              borderWidth: 1,
              borderColor: '#FFFFFF'
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: {
                  size: 10
                },
                boxWidth: 12
              }
            },
            title: {
              display: true,
              text: 'Expense Distribution',
              font: {
                size: 12
              }
            }
          }
        },
      };

      // Bar Chart Configuration
      const barConfig = {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Amount ($)",
              data,
              backgroundColor: "#2E86AB",
              borderColor: "#1B5E7D",
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Expense Amounts',
              font: {
                size: 12
              }
            }
          },
          scales: {
            y: { 
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($)'
              }
            },
            x: {
              ticks: {
                maxRotation: 45,
                minRotation: 45
              }
            }
          },
        },
      };

      // Render charts and place them side by side
      const pieImage = await chartJSNodeCanvas.renderToBuffer(pieConfig);
      const barImage = await chartJSNodeCanvas.renderToBuffer(barConfig);

      // Charts section title
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fillColor("#2E86AB")
        .text("Visual Analysis", leftColumn, yPosition)
        .fillColor("black");

      yPosition += 25;

      // Place charts side by side
      const chartWidth = 220;
      const chartHeight = 180;

      doc.image(pieImage, leftColumn, yPosition, { 
        width: chartWidth, 
        height: chartHeight 
      });

      doc.image(barImage, leftColumn + 240, yPosition, { 
        width: chartWidth, 
        height: chartHeight 
      });

      yPosition += chartHeight + 20;

    } else {
      // No expenses message
      doc
        .fontSize(12)
        .font("Helvetica")
        .text("No expenses recorded for this session.", leftColumn, yPosition);
      
      yPosition += 30;
    }

    // Summary section at the bottom
    const summaryY = Math.max(yPosition, 650);
    doc
      .fillColor("#F8F9FA")
      .rect(40, summaryY, doc.page.width - 80, 60)
      .fill()
      .fillColor("black")
      .fontSize(10)
      .font("Helvetica-Oblique")
      .text("Thank you for using Earnalyzer for your financial management needs.", 
            doc.page.width / 2, summaryY + 25, { align: "center" })
      .text(`Report generated on ${new Date().toLocaleString()}`, 
            doc.page.width / 2, summaryY + 40, { align: "center" });

    doc.end();
  } catch (err) {
    console.error("PDF Generation Error:", err);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

module.exports = generateSessionPDF;