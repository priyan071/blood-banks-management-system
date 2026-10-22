const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = docx;

console.log('Generating editable DOCX project report...');

const doc = new Document({
  creator: 'Priyan R (310624148072)',
  title: 'HemoVault: Centralized Blood Bank Management System - Project Report',
  description: 'Academic Project Report for Bachelor of Engineering in CSE (AIML), Easwari Engineering College',
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
        }
      },
      children: [
        // COVER PAGE
        new Paragraph({
          text: 'HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM',
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'A PROJECT REPORT',
          alignment: AlignmentType.CENTER,
          style: 'Normal',
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'Submitted by',
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: 'PRIYAN R (310624148072)',
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'in partial fulfillment for the award of the Degree of',
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: 'BACHELOR OF ENGINEERING in COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)',
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 }
        }),
        new Paragraph({
          text: 'EASWARI ENGINEERING COLLEGE',
          alignment: AlignmentType.CENTER,
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: '(AN AUTONOMOUS INSTITUTION) – AFFILIATED TO ANNA UNIVERSITY, CHENNAI',
          alignment: AlignmentType.CENTER,
          spacing: { after: 50 }
        }),
        new Paragraph({
          text: 'BHARATHI SALAI, RAMAPURAM, CHENNAI – 600 089',
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'APRIL 2026',
          alignment: AlignmentType.CENTER,
          pageBreakBefore: false,
          spacing: { after: 400 }
        }),

        // BONAFIDE CERTIFICATE
        new Paragraph({
          text: 'BONAFIDE CERTIFICATE',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          pageBreakBefore: true,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'Certified that this project report titled “HEMOVAULT: CENTRALIZED BLOOD BANK MANAGEMENT SYSTEM” is the Bonafide work of PRIYAN R (Registration No: 310624148072), who carried out the project work under my supervision in partial fulfillment of the requirements for the award of the Degree of Bachelor of Engineering in Computer Science and Engineering (Artificial Intelligence and Machine Learning) of Easwari Engineering College (Autonomous), affiliated to Anna University, Chennai.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 600 }
        }),
        new Paragraph({
          text: 'HEAD OF THE DEPARTMENT                              PROJECT SUPERVISOR',
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: 'Department of CSE (AIML)                            Ms. Divyanjali, Technical Trainer',
          spacing: { after: 400 }
        }),

        // ABSTRACT
        new Paragraph({
          text: 'ABSTRACT',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          pageBreakBefore: true,
          spacing: { after: 300 }
        }),
        new Paragraph({
          text: 'Timely access to safe, compatible blood products is a critical pillar of modern healthcare delivery, emergency resuscitation, and oncological therapy. Conventional blood banking infrastructures in developing and semi-urban regions frequently suffer from severe fragmentation, paper-dependent manual registers, lack of real-time multi-center stock visibility, unmonitored cold-chain shelf-life deterioration, and cumbersome requisition pipelines.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'To overcome these systemic vulnerabilities, this project presents HemoVault, a modern, full-stack Centralized Blood Bank Management System architected on the high-performance MERN Stack (MongoDB, Express.js, React.js, and Node.js). HemoVault establishes an unbroken digital custody trail spanning the entire transfusion lifecycle: voluntary donor onboarding, algorithmic clinical vitals assessment, digitized phlebotomy scheduling, mandatory five-marker infectious disease laboratory screening (HIV, Hepatitis B, Hepatitis C, Syphilis, and Malaria), component-level inventory segregation, time-to-live (TTL) expiration tracking, and multi-tier emergency requisition routing.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),

        // CHAPTER 1
        new Paragraph({
          text: 'CHAPTER 1: INTRODUCTION',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '1.1 OVERVIEW OF BLOOD BANKING LOGISTICS',
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 150 }
        }),
        new Paragraph({
          text: 'Human blood represents an irreplaceable biological resource essential for clinical survivability across a diverse spectrum of modern medical disciplines. From acute traumatic hemorrhage, emergency obstetric interventions, and complex cardiovascular surgeries to chronic hematological conditions such as thalassemia major, sickle cell anemia, and aggressive oncological chemotherapy, the availability of safe and compatible human blood components is frequently the decisive determinant between patient survival and preventable mortality.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '1.2 PROBLEM DEFINITION',
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 150 }
        }),
        new Paragraph({
          text: 'A comprehensive empirical evaluation of blood bank operations reveals that a majority still rely on manual paper registers, disjointed legacy spreadsheets, or non-networked software utilities. This leads to information asymmetry, severe stock outdating, transcription errors during biological safety screening, and lack of standardized donor eligibility triage.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '1.3 OBJECTIVES',
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 150 }
        }),
        new Paragraph({
          text: 'The primary objectives of HemoVault include real-time multi-portal inventory orchestration, algorithmic clinical eligibility screening, cryptographically enforced laboratory gatekeeping, priority-queue emergency requisition dispatch, and immutable audit logging.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),

        // CHAPTER 2
        new Paragraph({
          text: 'CHAPTER 2: RELATED WORK',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '2.1 LITERATURE REVIEW',
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 150 }
        }),
        new Paragraph({
          text: 'Literature establishes that effective blood management requires three non-negotiable architectural attributes: (1) strict algorithmic enforcement of clinical donor criteria, (2) automated FIFO inventory rotation with proactive TTL expiration sweeps, and (3) an inviolable digital gatekeeper coupling laboratory serological results directly with physical stock release.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),

        // CHAPTER 3
        new Paragraph({
          text: 'CHAPTER 3: SYSTEM ANALYSIS',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '3.1 FUNCTIONAL REQUIREMENTS',
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 150 }
        }),
        new Paragraph({
          text: 'Key functional capabilities comprise user authentication via JWT and bcrypt, donor clinical triage (evaluating age, weight, hemoglobin, pulse rate, BP, and donation intervals), phlebotomy intake with serial ID generation, laboratory testing gatekeeping, and multi-tier hospital requisition dispatch.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),

        // CHAPTER 4
        new Paragraph({
          text: 'CHAPTER 4: SYSTEM DESIGN',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '4.1 SYSTEM ARCHITECTURE',
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 150 }
        }),
        new Paragraph({
          text: 'HemoVault is architected on a 3-tier model consisting of a React 18 SPA presentation layer, an Express.js/Node.js API gateway and controller tier, and a MongoDB / MongoMemoryServer persistence layer.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),

        // CHAPTER 5
        new Paragraph({
          text: 'CHAPTER 5: IMPLEMENTATION',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '5.1 IMPLEMENTATION OVERVIEW',
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 150 }
        }),
        new Paragraph({
          text: 'Full-stack implementation details covering db.js smart connection fallback, User.js pre-save bcrypt hashing, auth.js JWT protection, eligibility.js clinical rules, testingController.js gatekeeper logic, requestController.js FIFO allocation, and api.js Axios interceptors.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),

        // CHAPTER 6
        new Paragraph({
          text: 'CHAPTER 6: CONCLUSION & FUTURE WORK',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: 'HemoVault delivers a verified, resilient, and enterprise-grade healthcare management solution. Future enhancements encompass AI-driven predictive demand forecasting, IoT smart refrigerator telemetry, autonomous drone delivery integration, and blockchain-based hemovigilance auditing.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        }),

        // REFERENCES
        new Paragraph({
          text: 'REFERENCES',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: '1. World Health Organization, "Action Framework to Advance Universal Access to Safe, Effective and Quality-Assured Blood Products 2020–2023," Geneva: WHO, 2020.\n2. National Blood Transfusion Council (NBTC), "Standards for Blood Banks and Blood Transfusion Services," New Delhi, 2017.\n3. G. P. Prastacos, "Blood Inventory Management: An Overview of Theory and Practice," Management Science, vol. 30, no. 7, pp. 777–800, 1984.',
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 200 }
        })
      ]
    }
  ]
});

const docsDir = path.resolve(__dirname, '../docs');
const docxPath = path.join(docsDir, 'HemoVault_Project_Report.docx');

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(docxPath, buffer);
  console.log('DOCX report successfully generated at:', docxPath);
});
