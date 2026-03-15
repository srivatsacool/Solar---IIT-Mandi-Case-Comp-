# SURYA OS - Sustainable Solar Circular Economy

## Project Description
SURYA OS is an AI-driven circular economy platform designed to tackle the escalating solar waste crisis by transforming end-of-life solar panels into strategic resources. The system integrates spatial prediction, computer vision triage, and bio-extraction logistics to recover high-value materials efficiently.

## Abstract
With the rapid expansion of clean energy, the impending accumulation of discarded solar panels presents a significant environmental hazard, projected to reach 1.7 million tonnes in India by 2050. SURYA OS proposes a comprehensive, digitized circular economy model that shifts waste management from a reactive, manual process to a proactive, intelligent network. By utilizing time-series machine learning for spatial forecasting, computer vision for automated triage, and bio-leaching for eco-friendly material recovery, this system establishes a sustainable and economically viable approach to solar waste. The integration of blockchain-backed Digital Twin Passports and micro-payment gateways further formalizes the informal recycling sector, ensuring transparency, safety, and operational efficiency.

## Introduction
The transition to renewable energy is heavily reliant on photovoltaics, yet the 25-year operational lifespan of these panels introduces a critical end-of-life challenge. Improper disposal leads to toxic leaching of lead and cadmium, while conventional recycling methods remain costly and environmentally harsh. SURYA OS addresses this gap through a unified digital platform that optimizes waste collection routing, automates condition assessment, and simulates advanced bio-extraction metrics. By treating end-of-life panels as "surface mines," the platform aims to recover strategic materials necessary for future energy infrastructure while minimizing ecological impact.

## Problem Statement
The current solar waste management ecosystem is highly fragmented, with up to 80% of operations handled informally using unsafe extraction techniques. This results in the loss of high-value materials (such as silver and high-purity silicon) and severe environmental toxicity from heavy metal leaching. Furthermore, the lack of spatial tracking for expiring panels leads to high logistical costs and "blind driving" search efforts, making traditional recycling economically prohibitive.

## Objectives
- Implement a predictive spatial mapping engine to forecast panel expiration and optimize collection logistics.
- Automate the triage process using computer vision to differentiate between refurbishable panels and those requiring material extraction.
- Formalize the informal waste sector by deploying a UPI-integrated incentive platform for local scrap dealers (Kabadiwalas).
- Introduce a secure tracking mechanism using blockchain-based Digital Twin Passports to prevent illegal dumping.
- Simulate and monitor a zero-toxicity bio-leaching extraction process that reduces operational costs and maximizes resource recovery.
- Establish a Digital Green Credit marketplace to incentivize corporate compliance and generate alternative revenue streams.

## System Architecture

The architecture of SURYA OS comprises three primary interconnected modules: the GIS & Logistics layer for prediction and routing, the AI-Vision Triage layer for condition assessment, and the Bio-Extraction Unit for monitoring material recovery.

```text
+-----------------------------------------------------------------+
|                          SURYA OS                               |
|                                                                 |
|  +-----------------+   +------------------+   +--------------+  |
|  | GIS & Predict   |   | AI-Vision Triage |   |Bio-Extraction|  |
|  | Engine          |<->| System           |<->|Unit          |  |
|  | (Time-Series ML)|   | (Computer Vision)|   |(Monitoring)  |  |
|  +--------+--------+   +--------+---------+   +------+-------+  |
|           |                     |                    |          |
+-----------|---------------------|--------------------|----------+
            |                     |                    |
            v                     v                    v
  +-----------------+   +------------------+   +--------------+
  | UPI Integration |   | Blockchain Ledger|   | Green Credit |
  | (Payments)      |   | (Digital Twins)  |   | Market       |
  +-----------------+   +------------------+   +--------------+
```

## Data Flow Diagram (DFD)

### Level 0 (Context Diagram)

```text
 [Formal/Informal Collectors]
           |  (Waste Input & Location)
           v
 +-------------------+
 |     SURYA OS      | ----> [Second-Life Market] (Refurbished Panels)
 |   Central System  |
 +-------------------+ ----> [Raw Material Market] (Silver, Silicon)
           |
           v
 [Green Credit Buyers] (Trade/Purchase Credits)
```

### Level 1 (Detailed Flow)

```text
1. Data Ingestion:
   [MNRE Data & Field Inputs] --> (Predictive Engine) --> [Spatial Heatmap]
                                                            |
2. Logistics & Collection:                                  |
   [Collectors/Kabadiwalas] <--- [Payment via UPI] <--------+
          |
3. Triage & Sorting (Path A/B):
   [Collected Panels] --> (AI-Vision Triage)
                               |
                               +--> Path A: [Health > 70%] --> (Second-Life Market)
                               |
                               +--> Path B: [Cracked/Failed] --> (Bio-Extraction Processing)
          |
4. Tracking & Accounting:
   (AI-Vision Triage) --> [Digital Twin Ledger (Blockchain)] --> (Green Credit Allocation)
```

## Technology Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | HTML5, CSS3, Vanilla JS | Core layout, animations, and interactive DOM manipulation |
| **Styling** | Custom CSS (Variables, Flex/Grid) | Responsive glassmorphism UI and data visualization |
| **Icons & Fonts** | FontAwesome, Google Fonts (Inter) | Typography and vector iconography |
| **Simulated Backend** | JavaScript | Mocked data streams and state management for UI views |
| **Blockchain Sync** | Mocked Polygon PoS | Digital Twin tracking abstraction |
| **ML Engine** | Mocked Predictive AI | Time-series forecasting and CV bounding box simulation |

## Data / Input Description
- **Geospatial Data**: Predicted coordinates, waste volume, and installation age data retrieved from predictive ML models based on MNRE records.
- **Visual Input**: Live conveyor feed images of solar panels intended for computer vision-based crack and integrity detection.
- **Financial Details**: Deposit events, micro-payment volumes, and transaction timestamps for the collection network.
- **Bio-metric Data**: Simulated sensor data (pH, temperature, bacterial density) from the bio-leaching reaction tanks.

## Model / Core Logic Explanation
- **Spatial Prediction Engine**: Applies time-series forecasting algorithms (incorporating Gaussian lifespan distributions and degradation rates) against regional installation data to identify "critical mass" zones. This prevents inefficient collection routes.
- **Computer Vision Triage**: Utilizes object detection algorithms to locate micro-cracks and assess cell array integrity. Based on a calculated health threshold (e.g., exactly or above 70%), the logic automatically routes the asset to "Path A" (Refurbishment) or "Path B" (Bio-Extraction).
- **Process Optimization AI**: Continuously analyzes bio-tank parameters, specifically temperature and pH levels, dynamically balancing the conditions to maximize the metabolic rate of *Acidithiobacillus* bacteria for optimal silver and silicon yield.

## Training / Execution Flow
1. **Model Training**: Time-Series ML models are trained using historical data from MNRE regarding installation capacities and estimated degradation cycles.
2. **Forecasting Execution**: The model generates a real-time heatmap depicting panel expiration likelihood across coordinates.
3. **Computer Vision Execution**: Real-time object detection models infer micro-cracks and structural damage from camera feeds on the triage system, assigning a viability score to each unit.

## Web App / UI Flow
1. **GIS & Logistics Dashboard**: Displays the interactive prediction heatmap for waste volumes, route optimization actions, and a live feed of micro-payments sent to local collectors.
2. **AI-Vision Triage System**: Presents a simulated camera HUD that overlays bounding boxes on scanned panels, reads their Digital Twin Passport via blockchain, and outputs an automated routing decision (Path A vs Path B).
3. **Bio-Extraction Unit**: Visualizes the chemical simulation tank with live data points (temperature, pH) and an ML terminal stream logging corrective actions and recovery efficiency metrics alongside the Digital Green Credit ledger.

## Limitations
- **Current Prototype State**: The existing application is a frontend shell relying on JavaScript arrays, timeouts, and static images to simulate actual machine learning, computer vision, and blockchain verification.
- **Hardware Integration Lack**: The application currently lacks live bindings to physical industrial IoT sensors, actual cameras on conveyor belts, and real payment gateways.
- **Data Dependency**: The spatial prediction's validity remains constrained by the availability and accuracy of external MNRE installation data in a real-world scenario.

## Future Enhancements
- **Backend Architecture**: Implement a robust backend API (e.g., Node.js or Python) to serve live time-series machine learning models and handle user session data.
- **Live Computer Vision Deployment**: Seamlessly integrate an active Python-based OpenCV/YOLO endpoint to perform actual inferencing on live conveyor belt video streams.
- **IoT Hardware Telemetry**: Connect real bio-reactor sensors (pH/Temperature) via WebSockets to feed accurate, live readings into the diagnostic dashboard.
- **Production Blockchains Integration**: Map the Digital Twin Passports to an actual testnet or mainnet smart contract for authentic, immutable data provenance.

## How to Run the Project
1. Clone or download the repository to your local machine.
2. Navigate to the directory containing the frontend assets (`index.html`, `style.css`, `script.js`).
3. No build tools or Node.js installations are required for this frontend shell.
4. Simply open `index.html` in any modern web browser to view the application. 
   - *For the best experience, use a local development server (e.g., VS Code Live Server extension or executing `python -m http.server`) to avoid any potential protocol issues with local asset loading.*

## Author / Credits
**Team WE SMASH**
- Maneet Singh
- GVLN Srivasta
- Anuja Dewan
- Arva Bavkar
#   S o l a r - - - I I T - M a n d i - C a s e - C o m p -  
 