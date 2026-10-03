import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";

const API_URL = "http://localhost:8081/api";

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  const parts = String(dateString).split("-");

  if (parts.length !== 3) {
    return dateString;
  }

  const [year, month, day] = parts;

  return `${day}/${month}/${year}`;
};

// --------------------------------------------------
// APP
// --------------------------------------------------

function App() {
  const [loggedInNgo, setLoggedInNgo] = useState(() => {
    try {
      const savedNgo = sessionStorage.getItem("ngoUser");
      return savedNgo ? JSON.parse(savedNgo) : null;
    } catch (error) {
      console.error("Could not restore NGO login:", error);
      sessionStorage.removeItem("ngoUser");
      return null;
    }
  });

  const tenantId = loggedInNgo?.tenantId ?? null;

  const logout = () => {
    sessionStorage.removeItem("ngoUser");
    setLoggedInNgo(null);
    setActivePage("dashboard");
    setDonors([]);
    setDonations([]);
    setReceipts([]);
    setCampaigns([]);
    setProgrammes([]);
    setBeneficiaries([]);
  };
  const [activePage, setActivePage] = useState("dashboard");

  // ------------------------------------------------
  // DONOR
  // ------------------------------------------------

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [kycStatus, setKycStatus] = useState("Pending");
  const [kycDocumentType, setKycDocumentType] = useState("");

  const [donors, setDonors] = useState([]);
  const [donorMessage, setDonorMessage] = useState("");

  // ------------------------------------------------
  // DONATION
  // ------------------------------------------------

  const [donorId, setDonorId] = useState("");
  const [donationCampaignId, setDonationCampaignId] = useState("");
  const [amount, setAmount] = useState("");
  const [donationDate, setDonationDate] = useState(getToday());

  const [donations, setDonations] = useState([]);
  const [donationMessage, setDonationMessage] = useState("");

  // ------------------------------------------------
  // RECEIPTS
  // ------------------------------------------------

  const [receipts, setReceipts] = useState([]);
  const [receiptMessage, setReceiptMessage] = useState("");

  // ------------------------------------------------
  // CAMPAIGNS
  // ------------------------------------------------

  const [campaigns, setCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignTarget, setCampaignTarget] = useState("");
  const [campaignRaised, setCampaignRaised] = useState("0");
  const [campaignStartDate, setCampaignStartDate] = useState(getToday());
  const [campaignEndDate, setCampaignEndDate] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("Active");
  const [campaignMessage, setCampaignMessage] = useState("");

  // ------------------------------------------------
  // PROGRAMMES
  // ------------------------------------------------

  const [programmes, setProgrammes] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [programmeName, setProgrammeName] = useState("");

  const [programmeDescription, setProgrammeDescription] = useState("");
  const [programmeType, setProgrammeType] = useState("Patient Rehabilitation");
  const [programmeStartDate, setProgrammeStartDate] = useState(getToday());
  const [programmeEndDate, setProgrammeEndDate] = useState("");
  const [programmeStatus, setProgrammeStatus] = useState("Active");
  const [programmeBeneficiaryCount, setProgrammeBeneficiaryCount] = useState("0");
  const [programmeMessage, setProgrammeMessage] = useState("");
  // ------------------------------------------------
  // MILESTONES
  // ------------------------------------------------

  const [milestoneProgrammeId, setMilestoneProgrammeId] = useState("");
  const [milestoneName, setMilestoneName] = useState("");
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [milestoneTargetCount, setMilestoneTargetCount] = useState("");
  const [milestoneCompletedCount, setMilestoneCompletedCount] = useState("0");
  const [milestoneStatus, setMilestoneStatus] = useState("Pending");
  const [milestoneTargetDate, setMilestoneTargetDate] = useState("");
  const [milestoneMessage, setMilestoneMessage] = useState("");
  // ------------------------------------------------
  // AUDIT LOGS
  // ------------------------------------------------


  // ------------------------------------------------
  // BENEFICIARIES
  // ------------------------------------------------

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [beneficiaryProgrammeId, setBeneficiaryProgrammeId] = useState("");
  const [beneficiaryAge, setBeneficiaryAge] = useState("");
  const [beneficiaryGender, setBeneficiaryGender] = useState("Male");
  const [beneficiaryPhone, setBeneficiaryPhone] = useState("");
  const [beneficiaryStatus, setBeneficiaryStatus] = useState("Active");
  const [beneficiaryRegistrationDate, setBeneficiaryRegistrationDate] =
    useState(getToday());
  const [beneficiaryMessage, setBeneficiaryMessage] = useState("");
  // ------------------------------------------------
  // AUDIT LOGS
  // ------------------------------------------------

  const [auditLogs, setAuditLogs] = useState([]);


  // ------------------------------------------------
  // STAFF
  // ------------------------------------------------

  const [staff, setStaff] = useState([]);

  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffProgramme, setStaffProgramme] = useState("");
  const [staffStatus, setStaffStatus] = useState("Active");
  const [staffMessage, setStaffMessage] = useState("");
  // ------------------------------------------------
  // SETTINGS - PASSWORD
  // ------------------------------------------------

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  // ------------------------------------------------
  // SETTINGS
  // ------------------------------------------------

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");

  // ------------------------------------------------
  // LOAD DONORS
  // ------------------------------------------------

  const loadDonors = async () => {
    try {
      const response = await fetch(`${API_URL}/donors?tenantId=${tenantId}`);

      if (!response.ok) {
        throw new Error("Could not load donors");
      }

      const data = await response.json();

      setDonors(data);
    } catch (error) {
      console.error("Error loading donors:", error);
    }
  };

  // ------------------------------------------------
  // LOAD DONATIONS
  // ------------------------------------------------

  const loadDonations = async () => {
    try {
      const response = await fetch(`${API_URL}/donations?tenantId=${tenantId}`);

      if (!response.ok) {
        throw new Error("Could not load donations");
      }

      const data = await response.json();

      setDonations(data);
    } catch (error) {
      console.error("Error loading donations:", error);
    }
  };

  // ------------------------------------------------
  // LOAD RECEIPTS
  // ------------------------------------------------

  const loadReceipts = async () => {
    try {
      const response = await fetch(`${API_URL}/receipts?tenantId=${tenantId}`);

      if (!response.ok) {
        throw new Error("Could not load receipts");
      }

      const data = await response.json();

      setReceipts(data);
    } catch (error) {
      console.error("Error loading receipts:", error);
    }
  };

  // ------------------------------------------------
  // LOAD CAMPAIGNS
  // ------------------------------------------------

  const loadCampaigns = async () => {
    try {
      const response = await fetch(`${API_URL}/campaigns?tenantId=${tenantId}`);

      if (!response.ok) {
        throw new Error("Could not load campaigns");
      }

      const data = await response.json();

      setCampaigns(data);
    } catch (error) {
      console.error("Error loading campaigns:", error);
    }
  };

  // ------------------------------------------------
  // LOAD PROGRAMMES
  // ------------------------------------------------

  const loadProgrammes = async () => {
    try {
      const response = await fetch(`${API_URL}/programmes?tenantId=${tenantId}`);

      if (!response.ok) {
        throw new Error("Could not load programmes");
      }

      const data = await response.json();

      setProgrammes(data);
    } catch (error) {
      console.error("Error loading programmes:", error);
    }
  };

  // LOAD MILESTONES
  const loadMilestones = async () => {
    try {
      const response = await fetch(
        `${API_URL}/milestones?tenantId=${tenantId}`
      );

      if (!response.ok) {
        throw new Error("Could not load milestones");
      }

      const data = await response.json();

      setMilestones(data);
    } catch (error) {
      console.error("Error loading milestones:", error);
    }
  };
  // ------------------------------------------------
  // LOAD STAFF
  // ------------------------------------------------

  const loadStaff = async () => {
    try {
      const response = await fetch(
        `${API_URL}/staff?tenantId=${tenantId}`
      );

      if (!response.ok) {
        throw new Error("Could not load staff");
      }

      const data = await response.json();

      setStaff(data);
    } catch (error) {
      console.error("Error loading staff:", error);
    }
  };
  // ------------------------------------------------
  // ADD STAFF
  // ------------------------------------------------

  const addStaff = async (e) => {
    e.preventDefault();

    setStaffMessage("");

    try {
      const response = await fetch(`${API_URL}/staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId: tenantId,
          name: staffName,
          email: staffEmail,
          phone: staffPhone,
          role: staffRole,
          programme: staffProgramme,
          status: staffStatus,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Staff API Error:", errorText);
        throw new Error(errorText || "Could not add staff");
      }

      const newStaff = await response.json();

      setStaff((prev) => [...prev, newStaff]);

      setStaffName("");
      setStaffEmail("");
      setStaffPhone("");
      setStaffRole("");
      setStaffProgramme("");
      setStaffStatus("Active");

      setStaffMessage("Staff member added successfully.");
    } catch (error) {
      console.error("Error adding staff:", error);
      setStaffMessage(error.message);
    }
  };

  // ------------------------------------------------
  // LOAD BENEFICIARIES
  // ------------------------------------------------

  const loadBeneficiaries = async () => {
    try {
      const response = await fetch(`${API_URL}/beneficiaries?tenantId=${tenantId}`);

      if (!response.ok) {
        throw new Error("Could not load beneficiaries");
      }

      const data = await response.json();

      setBeneficiaries(data);
    } catch (error) {
      console.error("Error loading beneficiaries:", error);
    }
  };

  // ------------------------------------------------
  // INITIAL LOAD
  // ------------------------------------------------

  useEffect(() => {
    if (!loggedInNgo || tenantId === null) {
      return;
    }

    loadDonors();
    loadDonations();
    loadReceipts();
    loadCampaigns();
    loadProgrammes();
    loadMilestones();
    loadBeneficiaries();
  }, [loggedInNgo, tenantId]);

  // ------------------------------------------------
  // ADD DONOR
  // ------------------------------------------------
  const addDonor = async (e) => {
    e.preventDefault();

    // DONOR VALIDATION

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    if (!kycDocumentType) {
      alert("Please select a KYC document type.");
      return;
    }

    if (!email.trim()) {
      setDonorMessage("Please enter donor email.");
      return;
    }

    if (!email.includes("@")) {
      setDonorMessage("Please enter a valid email address.");
      return;
    }

    if (!phone.trim()) {
      setDonorMessage("Please enter donor phone number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      setDonorMessage("Phone number must contain exactly 10 digits.");
      return;
    }

    if (!kycDocumentType) {
      setDonorMessage("Please select a KYC document type.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/donors`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          tenantId: tenantId,
          name: name,
          email: email,
          phone: phone,
          kycStatus: kycStatus,
          kycDocumentType: kycDocumentType,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not add donor");
      }

      const data = await response.json();

      setDonorMessage(
        `Donor added successfully! Donor ID: ${data.id}`
      );

      setName("");
      setEmail("");
      setPhone("");
      setKycStatus("Pending");
      setKycDocumentType("");

      await loadDonors();
    } catch (error) {
      console.error(error);

      setDonorMessage(
        "Error: Could not add donor."
      );
    }
  };

  // ------------------------------------------------
  // ADD DONATION
  // ------------------------------------------------

  const addDonation = async (e) => {
    e.preventDefault();

    // Remove accidental spaces
    const cleanAmount = String(amount).replace(/\s/g, "");

    if (!cleanAmount || Number(cleanAmount) <= 0) {
      setDonationMessage(
        "Please enter a valid donation amount."
      );

      return;
    }

    if (!donorId) {
      setDonationMessage(
        "Please select a donor."
      );

      return;
    }

    try {
      const response = await fetch(`${API_URL}/donations`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          donorId: Number(donorId),
          campaignId: donationCampaignId ? Number(donationCampaignId) : null,
          tenantId: tenantId,
          amount: Number(cleanAmount),
          donationDate: donationDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not record donation");
      }

      const data = await response.json();

      setDonationMessage(
        `Donation recorded successfully! Donation ID: ${data.id}`
      );

      setDonorId("");
      setDonationCampaignId("");
      setAmount("");
      setDonationDate(getToday());

      await loadDonations();
      await loadCampaigns();
    } catch (error) {
      console.error(error);

      setDonationMessage(
        "Error: Could not record donation."
      );
    }
  };

  // ------------------------------------------------
  // GENERATE RECEIPT
  // ------------------------------------------------

  const generateReceipt = async (donation) => {
    try {
      const response = await fetch(`${API_URL}/receipts`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          donationId: donation.id,
          donorId: donation.donorId,
          tenantId: donation.tenantId || tenantId,
          amount: Number(donation.amount),
        }),
      });

      if (!response.ok) {
        throw new Error("Could not generate receipt");
      }

      const data = await response.json();

      setReceiptMessage(
        `Receipt generated successfully: ${data.receiptNumber}`
      );

      await loadReceipts();

      setActivePage("receipts");
    } catch (error) {
      console.error(error);

      setReceiptMessage(
        "Error: Could not generate receipt."
      );
    }
  };

  // ------------------------------------------------
  // ADD CAMPAIGN
  // ------------------------------------------------

  const addCampaign = async (e) => {
    e.preventDefault();
    setCampaignMessage("");

    const cleanTarget = String(campaignTarget).replace(/\s/g, "");
    const cleanRaised = String(campaignRaised || "0").replace(/\s/g, "");

    if (!campaignName.trim()) {
      setCampaignMessage("Please enter a campaign name.");
      return;
    }

    if (!cleanTarget || Number(cleanTarget) <= 0) {
      setCampaignMessage("Please enter a valid target amount.");
      return;
    }

    if (campaignEndDate && campaignStartDate && campaignEndDate < campaignStartDate) {
      setCampaignMessage("End date cannot be before start date.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/campaigns?tenantId=${tenantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId: tenantId,
          name: campaignName.trim(),
          description: campaignDescription.trim(),
          targetAmount: Number(cleanTarget),
          amountRaised: Number(cleanRaised) || 0,
          startDate: campaignStartDate || null,
          endDate: campaignEndDate || null,
          status: campaignStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not create campaign");
      }

      const data = await response.json();

      setCampaignMessage(
        `Campaign created successfully! Campaign ID: ${data.id}`
      );

      setCampaignName("");
      setCampaignDescription("");
      setCampaignTarget("");
      setCampaignRaised("0");
      setCampaignStartDate(getToday());
      setCampaignEndDate("");
      setCampaignStatus("Active");

      await loadCampaigns();
    } catch (error) {
      console.error(error);
      setCampaignMessage("Error: Could not create campaign.");
    }
  };

  // ------------------------------------------------
  // ADD PROGRAMME
  // ------------------------------------------------

  const addProgramme = async (e) => {
    e.preventDefault();
    setProgrammeMessage("");

    const cleanBeneficiaries = String(
      programmeBeneficiaryCount || "0"
    ).replace(/\s/g, "");

    if (!programmeName.trim()) {
      setProgrammeMessage("Please enter a programme name.");
      return;
    }

    if (
      programmeEndDate &&
      programmeStartDate &&
      programmeEndDate < programmeStartDate
    ) {
      setProgrammeMessage("End date cannot be before start date.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/programmes?tenantId=${tenantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId: tenantId,
          name: programmeName.trim(),
          description: programmeDescription.trim(),
          programmeType: programmeType,
          startDate: programmeStartDate || null,
          endDate: programmeEndDate || null,
          status: programmeStatus,
          beneficiaryCount: Number(cleanBeneficiaries) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not create programme");
      }

      const data = await response.json();

      setProgrammeMessage(
        `Programme created successfully! Programme ID: ${data.id}`
      );

      setProgrammeName("");
      setProgrammeDescription("");
      setProgrammeType("Patient Rehabilitation");
      setProgrammeStartDate(getToday());
      setProgrammeEndDate("");
      setProgrammeStatus("Active");
      setProgrammeBeneficiaryCount("0");

      await loadProgrammes();
    } catch (error) {
      console.error(error);
      setProgrammeMessage("Error: Could not create programme.");
    }
  };
  // ------------------------------------------------
  // ADD MILESTONE
  // ------------------------------------------------

  const addMilestone = async (e) => {
    e.preventDefault();
    setMilestoneMessage("");

    const cleanTarget = String(
      milestoneTargetCount || "0"
    ).replace(/\s/g, "");

    const cleanCompleted = String(
      milestoneCompletedCount || "0"
    ).replace(/\s/g, "");

    if (!milestoneProgrammeId) {
      setMilestoneMessage("Please select a programme.");
      return;
    }

    if (!milestoneName.trim()) {
      setMilestoneMessage("Please enter a milestone name.");
      return;
    }

    if (!cleanTarget || Number(cleanTarget) <= 0) {
      setMilestoneMessage("Please enter a valid target count.");
      return;
    }

    if (Number(cleanCompleted) < 0) {
      setMilestoneMessage("Completed count cannot be negative.");
      return;
    }

    if (Number(cleanCompleted) > Number(cleanTarget)) {
      setMilestoneMessage(
        "Completed count cannot be greater than target count."
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/milestones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId: tenantId,
          programmeId: Number(milestoneProgrammeId),
          name: milestoneName.trim(),
          description: milestoneDescription.trim(),
          targetCount: Number(cleanTarget),
          completedCount: Number(cleanCompleted) || 0,
          status: milestoneStatus,
          targetDate: milestoneTargetDate || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not create milestone");
      }

      const data = await response.json();

      setMilestoneMessage(
        `Milestone created successfully! Milestone ID: ${data.id}`
      );

      setMilestoneProgrammeId("");
      setMilestoneName("");
      setMilestoneDescription("");
      setMilestoneTargetCount("");
      setMilestoneCompletedCount("0");
      setMilestoneStatus("Pending");
      setMilestoneTargetDate("");

      await loadMilestones();
    } catch (error) {
      console.error(error);
      setMilestoneMessage(
        "Error: Could not create milestone."
      );
    }
  };

  // ------------------------------------------------
  // ADD BENEFICIARY
  // ------------------------------------------------

  const addBeneficiary = async (e) => {
    e.preventDefault();
    setBeneficiaryMessage("");

    if (!beneficiaryName.trim()) {
      setBeneficiaryMessage("Please enter beneficiary name.");
      return;
    }

    if (!beneficiaryProgrammeId) {
      setBeneficiaryMessage("Please select a programme.");
      return;
    }

    if (beneficiaryAge && Number(beneficiaryAge) < 0) {
      setBeneficiaryMessage("Please enter a valid age.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/beneficiaries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId: tenantId,
          programmeId: Number(beneficiaryProgrammeId),
          name: beneficiaryName.trim(),
          age: beneficiaryAge ? Number(beneficiaryAge) : 0,
          gender: beneficiaryGender,
          phone: beneficiaryPhone.trim(),
          status: beneficiaryStatus,
          registrationDate:
            beneficiaryRegistrationDate || getToday(),
        }),
      });

      if (!response.ok) {
        throw new Error("Could not create beneficiary");
      }

      const data = await response.json();

      setBeneficiaryMessage(
        `Beneficiary added successfully! Beneficiary ID: ${data.id}`
      );

      setBeneficiaryName("");
      setBeneficiaryProgrammeId("");
      setBeneficiaryAge("");
      setBeneficiaryGender("Male");
      setBeneficiaryPhone("");
      setBeneficiaryStatus("Active");
      setBeneficiaryRegistrationDate(getToday());

      await loadBeneficiaries();
    } catch (error) {
      console.error(error);
      setBeneficiaryMessage("Error: Could not add beneficiary.");
    }
  };

  // ------------------------------------------------
  // CALCULATIONS
  // ------------------------------------------------

  const totalDonors = donors.length;

  const totalDonations = donations.reduce(
    (total, donation) =>
      total + Number(donation.amount || 0),
    0
  );

  const verifiedDonors = donors.filter(
    (donor) => donor.kycStatus === "Verified"
  ).length;

  const pendingDonors = donors.filter(
    (donor) =>
      !donor.kycStatus ||
      donor.kycStatus === "Pending"
  ).length;

  // ------------------------------------------------
  // SIDEBAR MENU
  // ------------------------------------------------

  const menuItems = [
    {
      section: "MAIN",

      items: [
        {
          id: "dashboard",
          icon: "⌂",
          label: "Dashboard",
        },
      ],
    },

    {
      section: "FUNDRAISING",

      items: [
        {
          id: "donors",
          icon: "♙",
          label: "Donors",
        },

        {
          id: "donations",
          icon: "₹",
          label: "Donations",
        },

        {
          id: "campaigns",
          icon: "⚑",
          label: "Campaigns",
        },

        {
          id: "receipts",
          icon: "▤",
          label: "Receipts",
        },
      ],
    },

    {
      section: "IMPACT",

      items: [
        {
          id: "programmes",
          icon: "▣",
          label: "Programmes",
        },
        {
          id: "milestones",
          icon: "✓",
          label: "Milestones",
        },

        {
          id: "beneficiaries",
          icon: "♧",
          label: "Beneficiaries",
        },

        {
          id: "impact",
          icon: "◉",
          label: "Impact Dashboard",
        },
      ],
    },

    {
      section: "INTELLIGENCE",

      items: [
        {
          id: "intelligence",
          icon: "✦",
          label: "Donor Intelligence",
        },

        {
          id: "reports",
          icon: "▥",
          label: "Reports",
        },
      ],
    },

    {
      section: "ADMINISTRATION",

      items: [
        {
          id: "staff",
          icon: "♚",
          label: "Staff",
        },

        {
          id: "audit",
          icon: "◌",
          label: "Audit Logs",
        },

        {
          id: "settings",
          icon: "⚙",
          label: "Settings",
        },
      ],
    },
  ];

  // ==================================================
  // DASHBOARD
  // ==================================================

  const Dashboard = () => (
    <>
      <div className="page-header">
        <div>
          <h1>
            Good morning, {loggedInNgo?.ngoName || "NGO"} 👋
          </h1>
          <p>
            Here's an overview of your NGO's
            fundraising and social impact.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setDonorMessage("");
            setActivePage("donors");
          }}
        >
          + Add Donor
        </button>
      </div>

      <div className="stat-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            ♙
          </div>

          <div>
            <p>Total Donors</p>

            <h2>{totalDonors}</h2>

            <span className="positive">
              Active donor records
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            ₹
          </div>

          <div>
            <p>Total Donations</p>

            <h2>
              ₹{totalDonations.toLocaleString("en-IN")}
            </h2>

            <span className="positive">
              Recorded donations
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            ✓
          </div>

          <div>
            <p>KYC Verified</p>

            <h2>{verifiedDonors}</h2>

            <span className="positive">
              Verified donors
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            !
          </div>

          <div>
            <p>KYC Pending</p>

            <h2>{pendingDonors}</h2>

            <span className="warning-text">
              Needs attention
            </span>
          </div>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">
            <div>
              <h3>Donation Overview</h3>

              <p>
                Current recorded donation activity
              </p>
            </div>
          </div>

          <div className="empty-chart">

            <div className="chart-icon">
              📈
            </div>

            <h3>
              Donation analytics coming soon
            </h3>

            <p>
              Monthly donation trends and
              campaign performance will appear here.
            </p>

          </div>

        </div>

        <div className="panel">

          <div className="panel-header">
            <div>
              <h3>Quick Actions</h3>

              <p>
                Frequently used operations
              </p>
            </div>
          </div>

          <div className="quick-actions">

            <button
              onClick={() =>
                setActivePage("donors")
              }
            >
              <span>♙</span>

              <div>
                <strong>Add Donor</strong>

                <small>
                  Register a new donor
                </small>
              </div>
            </button>

            <button
              onClick={() =>
                setActivePage("donations")
              }
            >
              <span>₹</span>

              <div>
                <strong>Record Donation</strong>

                <small>
                  Add a donation transaction
                </small>
              </div>
            </button>

            <button
              onClick={() =>
                setActivePage("campaigns")
              }
            >
              <span>⚑</span>

              <div>
                <strong>Create Campaign</strong>

                <small>
                  Start a fundraising campaign
                </small>
              </div>
            </button>

            <button
              onClick={() =>
                setActivePage("reports")
              }
            >
              <span>▥</span>

              <div>
                <strong>Generate Report</strong>

                <small>
                  View NGO reports
                </small>
              </div>
            </button>

          </div>

        </div>

      </div>

      <div className="panel">

        <div className="panel-header">

          <div>
            <h3>Recent Donations</h3>

            <p>
              Latest recorded transactions
            </p>
          </div>

          <button
            className="text-button"
            onClick={() =>
              setActivePage("donations")
            }
          >
            View all →
          </button>

        </div>

        {donations.length === 0 ? (

          <div className="empty-state">

            <div>₹</div>

            <h3>
              No donations recorded yet
            </h3>

            <p>
              Donation transactions will appear here.
            </p>

          </div>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Donor ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {donations
                  .slice(-5)
                  .reverse()
                  .map((donation) => (

                    <tr key={donation.id}>

                      <td>
                        #{donation.id}
                      </td>

                      <td>
                        Donor #{donation.donorId}
                      </td>

                      <td className="amount">
                        ₹
                        {Number(
                          donation.amount
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        {formatDate(
                          donation.donationDate
                        )}
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
    </>
  );

  // ==================================================
  // DONORS PAGE
  // ==================================================

  const DonorsPage = () => (
    <>
      <div className="page-header">

        <div>

          <h1>
            Donor Management
          </h1>

          <p>
            Manage donors and maintain their KYC information.
          </p>

        </div>

      </div>

      <div className="mini-stats">

        <div>
          <span>Total Donors</span>
          <strong>{totalDonors}</strong>
        </div>

        <div>
          <span>KYC Verified</span>
          <strong>{verifiedDonors}</strong>
        </div>

        <div>
          <span>KYC Pending</span>
          <strong>{pendingDonors}</strong>
        </div>

      </div>

      <div className="two-column">

        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Register New Donor
              </h3>

              <p>
                Add donor information and KYC details.
              </p>

            </div>

          </div>

          <form onSubmit={addDonor}>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Donor Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter donor name"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter email address"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Enter phone number"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  KYC Status
                </label>

                <select
                  value={kycStatus}
                  onChange={(e) =>
                    setKycStatus(e.target.value)
                  }
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Verified">
                    Verified
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

              <div className="form-group full-width">

                <label>
                  KYC Document Type
                </label>

                <select
                  value={kycDocumentType}
                  onChange={(e) =>
                    setKycDocumentType(e.target.value)
                  }
                >

                  <option value="">
                    Select document
                  </option>

                  <option value="PAN Card">
                    PAN Card
                  </option>

                  <option value="Aadhaar Card">
                    Aadhaar Card
                  </option>

                  <option value="Passport">
                    Passport
                  </option>

                  <option value="Driving License">
                    Driving License
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>

            <button
              className="primary-button"
              type="submit"
            >
              Add Donor
            </button>

            {donorMessage && (

              <div className="success-message">
                {donorMessage}
              </div>

            )}

          </form>

        </div>

        <div className="panel info-panel">

          <div className="info-icon">
            🔐
          </div>

          <h3>
            Donor KYC Management
          </h3>

          <p>
            Keep donor verification information
            organized and easy to find.
          </p>

          <div className="info-list">

            <div>
              ✓ KYC verification status
            </div>

            <div>
              ✓ Document type tracking
            </div>

            <div>
              ✓ Centralized donor records
            </div>

            <div>
              ✓ Donation history
            </div>

          </div>

        </div>

      </div>

      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              Registered Donors
            </h3>

            <p>
              {totalDonors} donor records
            </p>

          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Donor</th>
                <th>Email</th>
                <th>Phone</th>
                <th>KYC Status</th>
                <th>Document</th>

              </tr>

            </thead>

            <tbody>

              {donors.map((donor) => (

                <tr key={donor.id}>

                  <td>
                    #{donor.id}
                  </td>

                  <td>
                    <strong>
                      {donor.name}
                    </strong>
                  </td>

                  <td>
                    {donor.email}
                  </td>

                  <td>
                    {donor.phone}
                  </td>

                  <td>

                    <span
                      className={`status ${donor.kycStatus === "Verified"
                        ? "verified"
                        : donor.kycStatus === "Rejected"
                          ? "rejected"
                          : "pending"
                        }`}
                    >
                      {donor.kycStatus ||
                        "Pending"}
                    </span>

                  </td>

                  <td>
                    {donor.kycDocumentType ||
                      "Not Provided"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );

  // ==================================================
  // DONATIONS PAGE
  // ==================================================

  const DonationsPage = () => (
    <>
      <div className="page-header">

        <div>

          <h1>
            Donation Management
          </h1>

          <p>
            Record and monitor donations received by the NGO.
          </p>

        </div>

      </div>

      <div className="two-column">

        <div className="panel">

          <div className="panel-header">

            <div>

              <h3>
                Record Donation
              </h3>

              <p>
                Create a new donation transaction.
              </p>

            </div>

          </div>

          <form onSubmit={addDonation}>

            <div className="form-group">

              <label>
                Donor
              </label>

              <select
                value={donorId}
                onChange={(e) =>
                  setDonorId(e.target.value)
                }
                required
              >

                <option value="">
                  Select donor
                </option>

                {donors.map((donor) => (

                  <option
                    key={donor.id}
                    value={donor.id}
                  >
                    {donor.name} — ID #{donor.id}
                  </option>

                ))}

              </select>

            </div>

            <div className="form-group">

              <label>
                Campaign (Optional)
              </label>

              <select
                value={donationCampaignId}
                onChange={(e) =>
                  setDonationCampaignId(e.target.value)
                }
              >

                <option value="">
                  Select campaign (Optional)
                </option>

                {campaigns.map((campaign) => (

                  <option
                    key={campaign.id}
                    value={campaign.id}
                  >
                    {campaign.name} — ID #{campaign.id}
                  </option>

                ))}

              </select>

            </div>

            <div className="form-group">

              <label>
                Donation Amount
              </label>

              {/* IMPORTANT:
                  This is TEXT, NOT NUMBER.
                  Therefore there are NO arrows.
                  You can type 5000 continuously.
              */}

              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const value =
                    e.target.value.replace(
                      /[^0-9]/g,
                      ""
                    );

                  setAmount(value);
                }}
                placeholder="Enter amount"
                required
                autoComplete="off"
              />

            </div>

            <div className="form-group">

              <label>
                Donation Date
              </label>

              <input
                type="date"
                value={donationDate}
                onChange={(e) =>
                  setDonationDate(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <button
              className="primary-button"
              type="submit"
            >
              Record Donation
            </button>

            {donationMessage && (

              <div className="success-message">
                {donationMessage}
              </div>

            )}

          </form>

        </div>

        <div className="panel donation-summary">

          <div className="large-amount">
            ₹{totalDonations.toLocaleString("en-IN")}
          </div>

          <p>
            Total recorded donations
          </p>

          <div className="summary-line">

            <span>
              Transactions
            </span>

            <strong>
              {donations.length}
            </strong>

          </div>

          <div className="summary-line">

            <span>
              Registered donors
            </span>

            <strong>
              {donors.length}
            </strong>

          </div>

        </div>

      </div>

      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              Donation Transactions
            </h3>

            <p>
              All recorded donation activity
            </p>

          </div>

        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Donor</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {donations.map((donation) => (

                <tr key={donation.id}>

                  <td>
                    #{donation.id}
                  </td>

                  <td>
                    Donor #{donation.donorId}
                  </td>

                  <td className="amount">
                    ₹
                    {Number(
                      donation.amount
                    ).toLocaleString("en-IN")}
                  </td>

                  <td>
                    {formatDate(
                      donation.donationDate
                    )}
                  </td>

                  <td>

                    <span className="status verified">
                      Recorded
                    </span>

                  </td>

                  <td>

                    <button
                      className="receipt-button"
                      onClick={() =>
                        generateReceipt(
                          donation
                        )
                      }
                    >
                      Generate Receipt
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>
  );

  // ==================================================
  // RECEIPTS PAGE
  // ==================================================

  const ReceiptsPage = () => (
    <>
      <div className="page-header">

        <div>

          <h1>
            Receipt Management
          </h1>

          <p>
            View and manage donation receipts generated by the NGO.
          </p>

        </div>

      </div>

      {receiptMessage && (

        <div className="success-message">
          {receiptMessage}
        </div>

      )}

      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              Generated Receipts
            </h3>

            <p>
              {receipts.length} receipt record(s)
            </p>

          </div>

        </div>

        {receipts.length === 0 ? (

          <div className="empty-state">

            <div>
              ▤
            </div>

            <h3>
              No receipts generated yet
            </h3>

            <p>
              Go to Donations and click
              "Generate Receipt" for a recorded donation.
            </p>

          </div>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Receipt Number</th>
                  <th>Donation ID</th>
                  <th>Donor ID</th>
                  <th>Amount</th>
                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {receipts
                  .slice()
                  .reverse()
                  .map((receipt) => (

                    <tr key={receipt.id}>

                      <td>
                        #{receipt.id}
                      </td>

                      <td>

                        <strong>
                          {receipt.receiptNumber ||
                            "-"}
                        </strong>

                      </td>

                      <td>
                        #{receipt.donationId}
                      </td>

                      <td>
                        Donor #{receipt.donorId}
                      </td>

                      <td className="amount">
                        ₹
                        {Number(
                          receipt.amount || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        {formatDate(
                          receipt.receiptDate
                        )}
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </>
  );

  // ==================================================
  // CAMPAIGNS PAGE
  // ==================================================

  const CampaignsPage = () => (
    <>
      <div className="page-header">
        <div>
          <h1>Campaign Management</h1>
          <p>
            Create fundraising campaigns and track their progress.
          </p>
        </div>
      </div>

      <div className="mini-stats">
        <div>
          <span>Total Campaigns</span>
          <strong>{campaigns.length}</strong>
        </div>

        <div>
          <span>Active Campaigns</span>
          <strong>
            {campaigns.filter(
              (campaign) =>
                !campaign.status ||
                campaign.status.toLowerCase() === "active"
            ).length}
          </strong>
        </div>

        <div>
          <span>Total Target</span>
          <strong>
            ₹
            {campaigns
              .reduce(
                (total, campaign) =>
                  total + Number(campaign.targetAmount || 0),
                0
              )
              .toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <span>Total Raised</span>
          <strong>
            ₹
            {campaigns
              .reduce(
                (total, campaign) =>
                  total + Number(campaign.amountRaised || 0),
                0
              )
              .toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="two-column">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Create New Campaign</h3>
              <p>Add fundraising campaign details.</p>
            </div>
          </div>

          <form onSubmit={addCampaign}>
            <div className="form-grid">
              <div className="form-group">
                <label>Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter campaign name"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={campaignStatus}
                  onChange={(e) => setCampaignStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Completed">Completed</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={campaignDescription}
                  onChange={(e) => setCampaignDescription(e.target.value)}
                  placeholder="Describe the purpose of the campaign"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Target Amount</label>
                <input
                  type="text"
                  value={campaignTarget}
                  onChange={(e) =>
                    setCampaignTarget(
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  placeholder="Enter target amount"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Amount Raised</label>
                <input
                  type="text"
                  value={campaignRaised}
                  onChange={(e) =>
                    setCampaignRaised(
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  placeholder="Enter amount raised"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={campaignStartDate}
                  onChange={(e) => setCampaignStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={campaignEndDate}
                  onChange={(e) => setCampaignEndDate(e.target.value)}
                />
              </div>
            </div>

            <button className="primary-button" type="submit">
              Create Campaign
            </button>

            {campaignMessage && (
              <div
                className={
                  campaignMessage.startsWith("Error") ||
                    campaignMessage.startsWith("Please")
                    ? "warning-message"
                    : "success-message"
                }
              >
                {campaignMessage}
              </div>
            )}
          </form>
        </div>

        <div className="panel info-panel">
          <div className="info-icon">⚑</div>

          <h3>Campaign Tracking</h3>

          <p>
            Track fundraising goals, money raised, campaign dates and
            campaign status in one place.
          </p>

          <div className="info-list">
            <div>✓ Campaign target tracking</div>
            <div>✓ Amount raised tracking</div>
            <div>✓ Campaign status</div>
            <div>✓ Start and end dates</div>
            <div>✓ Campaign progress</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Fundraising Campaigns</h3>
            <p>{campaigns.length} campaign record(s)</p>
          </div>
        </div>

        {campaigns.length === 0 ? (
          <div className="empty-state">
            <div>⚑</div>
            <h3>No campaigns created yet</h3>
            <p>
              Create your first fundraising campaign using the form above.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Campaign</th>
                  <th>Target</th>
                  <th>Raised</th>
                  <th>Progress</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {campaigns
                  .slice()
                  .reverse()
                  .map((campaign) => {
                    const target = Number(campaign.targetAmount || 0);
                    const raised = Number(campaign.amountRaised || 0);
                    const progress =
                      target > 0
                        ? Math.min((raised / target) * 100, 100)
                        : 0;

                    return (
                      <tr key={campaign.id}>
                        <td>#{campaign.id}</td>

                        <td>
                          <strong>{campaign.name}</strong>
                          {campaign.description && (
                            <div className="table-subtext">
                              {campaign.description}
                            </div>
                          )}
                        </td>

                        <td className="amount">
                          ₹{target.toLocaleString("en-IN")}
                        </td>

                        <td className="amount">
                          ₹{raised.toLocaleString("en-IN")}
                        </td>

                        <td>
                          <strong>{progress.toFixed(0)}%</strong>
                        </td>

                        <td>{formatDate(campaign.startDate)}</td>

                        <td>{formatDate(campaign.endDate)}</td>

                        <td>
                          <span
                            className={`status ${campaign.status === "Completed"
                              ? "verified"
                              : campaign.status === "Paused"
                                ? "rejected"
                                : "pending"
                              }`}
                          >
                            {campaign.status || "Active"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );

  // ==================================================
  // PROGRAMMES PAGE
  // ==================================================

  const ProgrammesPage = () => (


    <>
      <div className="page-header">
        <div>
          <h1>Programme Management</h1>
          <p>
            Manage NGO programmes and track beneficiaries and programme
            activities.
          </p>
        </div>
      </div>

      <div className="mini-stats">
        <div>
          <span>Total Programmes</span>
          <strong>{programmes.length}</strong>
        </div>

        <div>
          <span>Active Programmes</span>
          <strong>
            {programmes.filter(
              (programme) =>
                !programme.status ||
                programme.status.toLowerCase() === "active"
            ).length}
          </strong>
        </div>

        <div>
          <span>Total Beneficiaries</span>
          <strong>
            {programmes
              .reduce(
                (total, programme) =>
                  total + Number(programme.beneficiaryCount || 0),
                0
              )
              .toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="two-column">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Create New Programme</h3>
              <p>Add programme and beneficiary information.</p>
            </div>
          </div>

          <form onSubmit={addProgramme}>
            <div className="form-grid">
              <div className="form-group">
                <label>Programme Name</label>
                <input
                  type="text"
                  value={programmeName}
                  onChange={(e) => setProgrammeName(e.target.value)}
                  placeholder="Enter programme name"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Programme Type</label>
                <select
                  value={programmeType}
                  onChange={(e) => setProgrammeType(e.target.value)}
                >
                  <option value="Patient Rehabilitation">
                    Patient Rehabilitation
                  </option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Food Support">Food Support</option>
                  <option value="Livelihood">Livelihood</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={programmeDescription}
                  onChange={(e) => setProgrammeDescription(e.target.value)}
                  placeholder="Describe the programme"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Beneficiary Count</label>
                <input
                  type="text"
                  value={programmeBeneficiaryCount}
                  onChange={(e) =>
                    setProgrammeBeneficiaryCount(
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  placeholder="Enter beneficiary count"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={programmeStatus}
                  onChange={(e) => setProgrammeStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Planned">Planned</option>
                  <option value="Completed">Completed</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={programmeStartDate}
                  onChange={(e) => setProgrammeStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={programmeEndDate}
                  onChange={(e) => setProgrammeEndDate(e.target.value)}
                />
              </div>
            </div>

            <button className="primary-button" type="submit">
              Create Programme
            </button>

            {programmeMessage && (
              <div
                className={
                  programmeMessage.startsWith("Error") ||
                    programmeMessage.startsWith("Please")
                    ? "warning-message"
                    : "success-message"
                }
              >
                {programmeMessage}
              </div>
            )}
          </form>
        </div>

        <div className="panel info-panel">
          <div className="info-icon">▣</div>

          <h3>Programme Tracking</h3>

          <p>
            Organize NGO activities, programme dates, beneficiary counts and
            operational status.
          </p>

          <div className="info-list">
            <div>✓ Programme information</div>
            <div>✓ Programme type</div>
            <div>✓ Beneficiary count</div>
            <div>✓ Start and end dates</div>
            <div>✓ Programme status</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>NGO Programmes</h3>
            <p>{programmes.length} programme record(s)</p>
          </div>
        </div>

        {programmes.length === 0 ? (
          <div className="empty-state">
            <div>▣</div>
            <h3>No programmes created yet</h3>
            <p>
              Create your first programme using the form above.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Programme</th>
                  <th>Type</th>
                  <th>Beneficiaries</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {programmes
                  .slice()
                  .reverse()
                  .map((programme) => (
                    <tr key={programme.id}>
                      <td>#{programme.id}</td>

                      <td>
                        <strong>{programme.name}</strong>
                        {programme.description && (
                          <div className="table-subtext">
                            {programme.description}
                          </div>
                        )}
                      </td>

                      <td>{programme.programmeType || "-"}</td>

                      <td>
                        <strong>
                          {Number(
                            programme.beneficiaryCount || 0
                          ).toLocaleString("en-IN")}
                        </strong>
                      </td>

                      <td>{formatDate(programme.startDate)}</td>

                      <td>{formatDate(programme.endDate)}</td>

                      <td>
                        <span
                          className={`status ${programme.status === "Completed"
                            ? "verified"
                            : programme.status === "Paused"
                              ? "rejected"
                              : "pending"
                            }`}
                        >
                          {programme.status || "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );

  // ==================================================
  // BENEFICIARIES PAGE
  // ==================================================

  const BeneficiariesPage = () => (
    <>
      <div className="page-header">
        <div>
          <h1>Beneficiary Management</h1>
          <p>
            Register beneficiaries and connect them with NGO programmes.
          </p>
        </div>
      </div>

      <div className="mini-stats">
        <div>
          <span>Total Beneficiaries</span>
          <strong>{beneficiaries.length}</strong>
        </div>

        <div>
          <span>Active Beneficiaries</span>
          <strong>
            {beneficiaries.filter(
              (beneficiary) =>
                !beneficiary.status ||
                beneficiary.status.toLowerCase() === "active"
            ).length}
          </strong>
        </div>

        <div>
          <span>Programmes</span>
          <strong>{programmes.length}</strong>
        </div>
      </div>

      <div className="two-column">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Register New Beneficiary</h3>
              <p>Add beneficiary information and programme details.</p>
            </div>
          </div>

          <form onSubmit={addBeneficiary}>
            <div className="form-grid">
              <div className="form-group">
                <label>Beneficiary Name</label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  placeholder="Enter beneficiary name"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Programme</label>
                <select
                  value={beneficiaryProgrammeId}
                  onChange={(e) =>
                    setBeneficiaryProgrammeId(e.target.value)
                  }
                  required
                >
                  <option value="">Select programme</option>
                  {programmes.map((programme) => (
                    <option
                      key={programme.id}
                      value={programme.id}
                    >
                      {programme.name} — ID #{programme.id}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Age</label>
                <input
                  type="text"
                  value={beneficiaryAge}
                  onChange={(e) =>
                    setBeneficiaryAge(
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  placeholder="Enter age"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  value={beneficiaryGender}
                  onChange={(e) => setBeneficiaryGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={beneficiaryPhone}
                  onChange={(e) =>
                    setBeneficiaryPhone(
                      e.target.value.replace(/[^0-9+ -]/g, "")
                    )
                  }
                  placeholder="Enter phone number"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={beneficiaryStatus}
                  onChange={(e) => setBeneficiaryStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label>Registration Date</label>
                <input
                  type="date"
                  value={beneficiaryRegistrationDate}
                  onChange={(e) =>
                    setBeneficiaryRegistrationDate(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <button className="primary-button" type="submit">
              Add Beneficiary
            </button>

            {beneficiaryMessage && (
              <div
                className={
                  beneficiaryMessage.startsWith("Error") ||
                    beneficiaryMessage.startsWith("Please")
                    ? "warning-message"
                    : "success-message"
                }
              >
                {beneficiaryMessage}
              </div>
            )}
          </form>
        </div>

        <div className="panel info-panel">
          <div className="info-icon">♧</div>

          <h3>Beneficiary Tracking</h3>

          <p>
            Maintain beneficiary records and connect each person with the
            programme supporting them.
          </p>

          <div className="info-list">
            <div>✓ Beneficiary records</div>
            <div>✓ Programme assignment</div>
            <div>✓ Age and gender</div>
            <div>✓ Contact information</div>
            <div>✓ Beneficiary status</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Registered Beneficiaries</h3>
            <p>{beneficiaries.length} beneficiary record(s)</p>
          </div>
        </div>

        {beneficiaries.length === 0 ? (
          <div className="empty-state">
            <div>♧</div>
            <h3>No beneficiaries registered yet</h3>
            <p>
              Register a beneficiary using the form above.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Beneficiary</th>
                  <th>Programme</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {beneficiaries
                  .slice()
                  .reverse()
                  .map((beneficiary) => {
                    const programme = programmes.find(
                      (item) => item.id === beneficiary.programmeId
                    );

                    return (
                      <tr key={beneficiary.id}>
                        <td>#{beneficiary.id}</td>

                        <td>
                          <strong>{beneficiary.name}</strong>
                        </td>

                        <td>
                          {programme
                            ? programme.name
                            : `Programme #${beneficiary.programmeId}`}
                        </td>

                        <td>{beneficiary.age || "-"}</td>

                        <td>{beneficiary.gender || "-"}</td>

                        <td>{beneficiary.phone || "-"}</td>

                        <td>
                          {formatDate(
                            beneficiary.registrationDate
                          )}
                        </td>

                        <td>
                          <span
                            className={`status ${beneficiary.status === "Completed"
                              ? "verified"
                              : beneficiary.status === "Inactive"
                                ? "rejected"
                                : "pending"
                              }`}
                          >
                            {beneficiary.status || "Active"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
  // ==================================================
  // MILESTONES PAGE
  // ==================================================

  const MilestonesPage = () => {

    const getMilestoneProgress = (target, completed) => {
      const targetNumber = Number(target || 0);
      const completedNumber = Number(completed || 0);

      if (targetNumber <= 0) {
        return 0;
      }

      return Math.min(
        (completedNumber / targetNumber) * 100,
        100
      );
    };

    return (
      <>
        <div className="page-header">
          <div>
            <h1>Milestone Management</h1>
            <p>
              Track programme progress and measure completed outcomes.
            </p>
          </div>
        </div>

        <div className="mini-stats">
          <div>
            <span>Total Milestones</span>
            <strong>{milestones.length}</strong>
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {
                milestones.filter(
                  (milestone) =>
                    milestone.status === "Completed"
                ).length
              }
            </strong>
          </div>

          <div>
            <span>In Progress</span>
            <strong>
              {
                milestones.filter(
                  (milestone) =>
                    milestone.status === "In Progress"
                ).length
              }
            </strong>
          </div>

          <div>
            <span>Pending</span>
            <strong>
              {
                milestones.filter(
                  (milestone) =>
                    !milestone.status ||
                    milestone.status === "Pending"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="two-column">

          <div className="panel">

            <div className="panel-header">
              <div>
                <h3>Create New Milestone</h3>
                <p>
                  Add a measurable milestone to a programme.
                </p>
              </div>
            </div>

            <form onSubmit={addMilestone}>

              <div className="form-grid">

                <div className="form-group">
                  <label>Programme</label>

                  <select
                    value={milestoneProgrammeId}
                    onChange={(e) =>
                      setMilestoneProgrammeId(e.target.value)
                    }
                    required
                  >
                    <option value="">
                      Select programme
                    </option>

                    {programmes.map((programme) => (
                      <option
                        key={programme.id}
                        value={programme.id}
                      >
                        {programme.name} — ID #{programme.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Milestone Name</label>

                  <input
                    type="text"
                    value={milestoneName}
                    onChange={(e) =>
                      setMilestoneName(e.target.value)
                    }
                    placeholder="Example: Patient Assessment Completed"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description</label>

                  <textarea
                    value={milestoneDescription}
                    onChange={(e) =>
                      setMilestoneDescription(e.target.value)
                    }
                    placeholder="Describe what needs to be completed"
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Target Count</label>

                  <input
                    type="text"
                    value={milestoneTargetCount}
                    onChange={(e) =>
                      setMilestoneTargetCount(
                        e.target.value.replace(/[^0-9]/g, "")
                      )
                    }
                    placeholder="Example: 50"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Completed Count</label>

                  <input
                    type="text"
                    value={milestoneCompletedCount}
                    onChange={(e) =>
                      setMilestoneCompletedCount(
                        e.target.value.replace(/[^0-9]/g, "")
                      )
                    }
                    placeholder="Example: 20"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    value={milestoneStatus}
                    onChange={(e) =>
                      setMilestoneStatus(e.target.value)
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Target Date</label>

                  <input
                    type="date"
                    value={milestoneTargetDate}
                    onChange={(e) =>
                      setMilestoneTargetDate(e.target.value)
                    }
                  />
                </div>

              </div>

              <button
                className="primary-button"
                type="submit"
              >
                Create Milestone
              </button>

              {milestoneMessage && (
                <div
                  className={
                    milestoneMessage.startsWith("Error") ||
                      milestoneMessage.startsWith("Please")
                      ? "warning-message"
                      : "success-message"
                  }
                >
                  {milestoneMessage}
                </div>
              )}

            </form>
          </div>


          <div className="panel info-panel">

            <div className="info-icon">
              ✓
            </div>

            <h3>Milestone Tracking</h3>

            <p>
              Break an NGO programme into measurable
              steps and track progress towards each outcome.
            </p>

            <div className="info-list">
              <div>✓ Programme-wise milestones</div>
              <div>✓ Target count tracking</div>
              <div>✓ Completed count tracking</div>
              <div>✓ Progress percentage</div>
              <div>✓ Status tracking</div>
              <div>✓ Target date</div>
            </div>

          </div>

        </div>


        <div className="panel">

          <div className="panel-header">
            <div>
              <h3>Programme Milestones</h3>

              <p>
                {milestones.length} milestone record(s)
              </p>
            </div>
          </div>


          {milestones.length === 0 ? (

            <div className="empty-state">

              <div>✓</div>

              <h3>
                No milestones created yet
              </h3>

              <p>
                Create your first milestone using
                the form above.
              </p>

            </div>

          ) : (

            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Milestone</th>
                    <th>Programme</th>
                    <th>Target</th>
                    <th>Completed</th>
                    <th>Progress</th>
                    <th>Target Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {milestones
                    .slice()
                    .reverse()
                    .map((milestone) => {

                      const programme =
                        programmes.find(
                          (item) =>
                            Number(item.id) ===
                            Number(milestone.programmeId)
                        );

                      const progress =
                        getMilestoneProgress(
                          milestone.targetCount,
                          milestone.completedCount
                        );

                      return (
                        <tr key={milestone.id}>

                          <td>
                            #{milestone.id}
                          </td>

                          <td>
                            <strong>
                              {milestone.name}
                            </strong>

                            {milestone.description && (
                              <div className="table-subtext">
                                {milestone.description}
                              </div>
                            )}
                          </td>

                          <td>
                            {programme
                              ? programme.name
                              : `Programme #${milestone.programmeId}`}
                          </td>

                          <td>
                            {milestone.targetCount || 0}
                          </td>

                          <td>
                            {milestone.completedCount || 0}
                          </td>

                          <td>
                            <strong>
                              {progress.toFixed(0)}%
                            </strong>
                          </td>

                          <td>
                            {formatDate(milestone.targetDate)}
                          </td>

                          <td>

                            <span
                              className={`status ${milestone.status === "Completed"
                                ? "verified"
                                : milestone.status === "In Progress"
                                  ? "pending"
                                  : "rejected"
                                }`}
                            >
                              {milestone.status || "Pending"}
                            </span>

                          </td>

                        </tr>
                      );
                    })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </>
    );
  };
  // ==================================================
  // AUDIT LOGS PAGE
  // ==================================================

  const AuditLogsPage = () => {
    return (
      <>
        <div className="page-header">
          <div>
            <h1>Audit Logs</h1>
            <p>
              Track important actions performed within the NGO platform.
            </p>
          </div>
        </div>

        <div className="mini-stats">
          <div>
            <span>Total Activities</span>
            <strong>{auditLogs.length}</strong>
          </div>

          <div>
            <span>Log Type</span>
            <strong>System</strong>
          </div>

          <div>
            <span>NGO</span>
            <strong>{loggedInNgo?.ngoName || "NGO"}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>Active</strong>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Activity History</h3>
              <p>
                {auditLogs.length} audit record(s)
              </p>
            </div>
          </div>

          {auditLogs.length === 0 ? (
            <div className="empty-state">
              <div>◌</div>

              <h3>No audit logs yet</h3>

              <p>
                Important platform activities will appear here.
              </p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Action</th>
                    <th>Module</th>
                    <th>Description</th>
                    <th>Performed By</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        #{log.id}
                      </td>

                      <td>
                        <span className="status verified">
                          {log.action}
                        </span>
                      </td>

                      <td>
                        {log.module}
                      </td>

                      <td>
                        {log.description}
                      </td>

                      <td>
                        {log.performedBy}
                      </td>

                      <td>
                        {log.createdAt
                          ? new Date(
                            log.createdAt
                          ).toLocaleString("en-IN")
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  };
  // ==================================================
  // STAFF PAGE
  // ==================================================

  const StaffPage = () => (
    <>
      <div className="page-header">
        <div>
          <h1>Staff</h1>
          <p>Manage NGO staff and programme assignments.</p>
        </div>
      </div>

      <div className="content-grid">

        {/* ADD STAFF */}
        <div className="card">

          <div className="card-header">
            <div>
              <h2>Add Staff Member</h2>
              <p>Register a staff member for this NGO.</p>
            </div>
          </div>

          <form onSubmit={addStaff}>

            <div className="form-grid">

              <div className="form-group">
                <label>Staff Name</label>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  placeholder="Enter staff name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value)}
                  placeholder="e.g. Manager, Coordinator"
                  required
                />
              </div>

              <div className="form-group">
                <label>Programme</label>
                <input
                  type="text"
                  value={staffProgramme}
                  onChange={(e) => setStaffProgramme(e.target.value)}
                  placeholder="Enter programme"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={staffStatus}
                  onChange={(e) => setStaffStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

            </div>

            <button type="submit" className="primary-button">
              Add Staff
            </button>

            {staffMessage && (
              <p style={{ marginTop: "12px" }}>
                {staffMessage}
              </p>
            )}

          </form>

        </div>

        {/* STAFF LIST */}
        <div className="card">

          <div className="card-header">
            <div>
              <h2>Staff Members</h2>
              <p>{staff.length} staff member(s) registered.</p>
            </div>
          </div>

          {staff.length === 0 ? (
            <div className="empty-state">
              <h3>No Staff Members</h3>
              <p>Add your first staff member using the form above.</p>
            </div>
          ) : (
            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Programme</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {staff
                    .slice()
                    .reverse()
                    .map((member) => (
                      <tr key={member.id}>

                        <td>
                          <strong>{member.name}</strong>
                        </td>

                        <td>{member.email || "-"}</td>

                        <td>{member.phone || "-"}</td>

                        <td>{member.role || "-"}</td>

                        <td>{member.programme || "-"}</td>

                        <td>
                          <span
                            className={`status ${member.status === "Active"
                              ? "verified"
                              : "rejected"
                              }`}
                          >
                            {member.status || "Active"}
                          </span>
                        </td>

                      </tr>
                    ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </>
  );
  // ==================================================
  // COMING SOON
  // ==================================================

  const ComingSoon = ({
    title,
    description,
    icon,
  }) => (
    <>
      <div className="page-header">

        <div>

          <h1>
            {title}
          </h1>

          <p>
            {description}
          </p>

        </div>

      </div>

      <div className="coming-soon">

        <div className="coming-icon">
          {icon}
        </div>

        <h2>
          {title} Module
        </h2>

        <p>
          This module is part of the planned
          NGO Impact CRM platform and will
          be developed next.
        </p>

        <span>
          Module planned for the next
          development phase
        </span>

      </div>
    </>
  );

  // ==================================================
  // PAGE ROUTER
  // ==================================================

  const renderPage = () => {

    switch (activePage) {

      case "donors":
        return DonorsPage();
      case "donations":
        return DonationsPage();
      case "receipts":
        return <ReceiptsPage />;

      case "campaigns":
        return CampaignsPage();

      case "programmes":
        return ProgrammesPage();

      case "milestones":
        return MilestonesPage();

      case "beneficiaries":
        return BeneficiariesPage();

      case "impact":
        return (
          <div className="page-container">
            <div className="page-header">
              <h1>Impact Dashboard</h1>
              <p>Measure programme outcomes and social impact.</p>
            </div>

            <div className="stats-grid">

              <div className="stat-card">
                <span>Total Beneficiaries</span>
                <strong>{beneficiaries.length}</strong>
              </div>

              <div className="stat-card">
                <span>Active Programmes</span>
                <strong>
                  {programmes.filter(p => p.status === "Active").length}
                </strong>
              </div>

              <div className="stat-card">
                <span>Active Campaigns</span>
                <strong>
                  {campaigns.filter(c => c.status === "Active").length}
                </strong>
              </div>

              <div className="stat-card">
                <span>Total Donations</span>
                <strong>
                  ₹{donations.reduce(
                    (total, donation) =>
                      total + Number(donation.amount || 0),
                    0
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

            <div className="content-card">
              <h2>Programme Impact</h2>

              {programmes.length === 0 ? (
                <p>No programme data available yet.</p>
              ) : (
                <div>
                  {programmes.map(programme => (
                    <div
                      key={programme.id}
                      style={{
                        padding: "15px",
                        marginBottom: "10px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px"
                      }}
                    >
                      <strong>{programme.name}</strong>

                      <p>
                        Type: {programme.programmeType}
                      </p>

                      <p>
                        Beneficiaries:{" "}
                        {
                          beneficiaries.filter(
                            (beneficiary) =>
                              Number(beneficiary.programmeId) ===
                              Number(programme.id)
                          ).length
                        }
                      </p>

                      <p>
                        Status: {programme.status}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "intelligence": {
        const donorStats = donors.map((donor) => {
          const donorDonations = donations.filter(
            (d) => Number(d.donorId) === Number(donor.id)
          );

          const totalAmount = donorDonations.reduce(
            (sum, d) => sum + Number(d.amount || 0),
            0
          );

          const donationCount = donorDonations.length;

          let classification = "New Donor";

          if (totalAmount >= 10000) {
            classification = "High-Value Donor";
          } else if (donationCount >= 2 || totalAmount >= 5000) {
            classification = "Regular Donor";
          }

          return {
            ...donor,
            totalAmount,
            donationCount,
            classification,
          };
        });

        const totalIntelligenceDonations = donorStats.reduce(
          (sum, donor) => sum + donor.totalAmount,
          0
        );

        const averageDonation =
          donations.length > 0
            ? totalIntelligenceDonations / donations.length
            : 0;

        const repeatDonors = donorStats.filter(
          (donor) => donor.donationCount >= 2
        ).length;

        const highValueDonors = donorStats.filter(
          (donor) => donor.classification === "High-Value Donor"
        ).length;

        const topDonor = [...donorStats].sort(
          (a, b) => b.totalAmount - a.totalAmount
        )[0];

        return (
          <div className="page-container">

            <div className="page-header">
              <div>
                <h1>Donor Intelligence</h1>
                <p>
                  Analyze donor behaviour and fundraising patterns.
                </p>
              </div>
            </div>

            <div className="stats-grid">

              <div className="stat-card">
                <span>Total Donors</span>
                <strong>{donors.length}</strong>
              </div>

              <div className="stat-card">
                <span>Total Donations</span>
                <strong>
                  ₹{totalIntelligenceDonations.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="stat-card">
                <span>Average Donation</span>
                <strong>
                  ₹{Math.round(averageDonation).toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="stat-card">
                <span>Repeat Donors</span>
                <strong>{repeatDonors}</strong>
              </div>

              <div className="stat-card">
                <span>High-Value Donors</span>
                <strong>{highValueDonors}</strong>
              </div>

            </div>

            <div className="card" style={{ marginTop: "24px" }}>

              <h2>Donor Analysis</h2>

              {donorStats.length === 0 ? (
                <p>No donor data available yet.</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          Donor
                        </th>
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          Donations
                        </th>
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          Total Amount
                        </th>
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          Classification
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {donorStats.map((donor) => (
                        <tr key={donor.id}>

                          <td style={{ padding: "12px" }}>
                            <strong>{donor.name}</strong>
                          </td>

                          <td style={{ padding: "12px" }}>
                            {donor.donationCount}
                          </td>

                          <td style={{ padding: "12px" }}>
                            ₹{donor.totalAmount.toLocaleString("en-IN")}
                          </td>

                          <td style={{ padding: "12px" }}>
                            <strong>{donor.classification}</strong>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            <div className="card" style={{ marginTop: "24px" }}>

              <h2>💡 Donor Insight</h2>

              {topDonor && topDonor.totalAmount > 0 ? (
                <p>
                  <strong>{topDonor.name}</strong> is currently the
                  highest contributing donor with total donations of{" "}
                  <strong>
                    ₹{topDonor.totalAmount.toLocaleString("en-IN")}
                  </strong>.
                </p>
              ) : (
                <p>
                  Start recording donations to generate donor insights.
                </p>
              )}

            </div>

          </div>
        );
      }

      case "reports": {
        const totalReportDonations = donations.reduce(
          (sum, d) => sum + Number(d.amount || 0),
          0
        );

        const averageReportDonation =
          donations.length > 0
            ? totalReportDonations / donations.length
            : 0;

        const repeatReportDonors = donors.filter((donor) => {
          const count = donations.filter(
            (d) => Number(d.donorId) === Number(donor.id)
          ).length;

          return count >= 2;
        }).length;

        const activeCampaigns = campaigns.filter(
          (c) => c.status === "Active"
        ).length;

        const activeProgrammes = programmes.filter(
          (p) => p.status === "Active"
        ).length;

        return (
          <div className="page-container">

            <div className="page-header">
              <div>
                <h1>Reports</h1>
                <p>
                  Generate organized NGO operational reports.
                </p>
              </div>
            </div>

            <div className="stats-grid">

              <div className="stat-card">
                <span>Total Donors</span>
                <strong>{donors.length}</strong>
              </div>

              <div className="stat-card">
                <span>Total Donations</span>
                <strong>
                  ₹{totalReportDonations.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="stat-card">
                <span>Donation Transactions</span>
                <strong>{donations.length}</strong>
              </div>

              <div className="stat-card">
                <span>Average Donation</span>
                <strong>
                  ₹{Math.round(averageReportDonation).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

            <div className="card" style={{ marginTop: "24px" }}>

              <h2>Donation Report</h2>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "12px", textAlign: "left" }}>
                      Metric
                    </th>
                    <th style={{ padding: "12px", textAlign: "left" }}>
                      Value
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td style={{ padding: "12px" }}>
                      Total Donations
                    </td>
                    <td style={{ padding: "12px" }}>
                      ₹{totalReportDonations.toLocaleString("en-IN")}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "12px" }}>
                      Transactions
                    </td>
                    <td style={{ padding: "12px" }}>
                      {donations.length}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "12px" }}>
                      Average Donation
                    </td>
                    <td style={{ padding: "12px" }}>
                      ₹{Math.round(averageReportDonation).toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>

            <div className="card" style={{ marginTop: "24px" }}>

              <h2>Donor Report</h2>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "12px" }}>
                      Total Donors
                    </td>
                    <td style={{ padding: "12px" }}>
                      {donors.length}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "12px" }}>
                      Repeat Donors
                    </td>
                    <td style={{ padding: "12px" }}>
                      {repeatReportDonors}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "12px" }}>
                      KYC Pending
                    </td>
                    <td style={{ padding: "12px" }}>
                      {
                        donors.filter(
                          (d) => d.kycStatus === "Pending"
                        ).length
                      }
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>

            <div className="card" style={{ marginTop: "24px" }}>

              <h2>Campaign & Programme Report</h2>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "12px" }}>
                      Total Campaigns
                    </td>
                    <td style={{ padding: "12px" }}>
                      {campaigns.length}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "12px" }}>
                      Active Campaigns
                    </td>
                    <td style={{ padding: "12px" }}>
                      {activeCampaigns}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "12px" }}>
                      Total Programmes
                    </td>
                    <td style={{ padding: "12px" }}>
                      {programmes.length}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "12px" }}>
                      Active Programmes
                    </td>
                    <td style={{ padding: "12px" }}>
                      {activeProgrammes}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "12px" }}>
                      Total Beneficiaries
                    </td>
                    <td style={{ padding: "12px" }}>
                      {beneficiaries.length}
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>

          </div>
        );
      }
      case "staff":
        return StaffPage();


      case "audit":
        return AuditLogsPage();

      case "settings":
        return (
          <>
            <div className="page-header">
              <div>
                <h1>Settings</h1>
                <p>
                  Configure your NGO Impact CRM platform.
                </p>
              </div>
            </div>

            {/* NGO INFORMATION */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>NGO Information</h3>
                  <p>View your registered NGO information.</p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>NGO Name</label>
                  <input
                    type="text"
                    value={loggedInNgo?.ngoName || ""}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>NGO Email</label>
                  <input
                    type="email"
                    value={loggedInNgo?.email || ""}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Tenant ID</label>
                  <input
                    type="text"
                    value={loggedInNgo?.tenantId || ""}
                    readOnly
                  />
                </div>

              </div>
            </div>

            {/* ACCOUNT INFORMATION */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>Account Information</h3>
                  <p>Information about the currently logged-in account.</p>
                </div>
              </div>

              <div className="detail-list">

                <div className="detail-row">
                  <span>Account Type</span>
                  <strong>NGO Administrator</strong>
                </div>

                <div className="detail-row">
                  <span>Login Email</span>
                  <strong>{loggedInNgo?.email || "-"}</strong>
                </div>

                <div className="detail-row">
                  <span>Tenant ID</span>
                  <strong>{loggedInNgo?.tenantId || "-"}</strong>
                </div>

              </div>
            </div>

            {/* PREFERENCES */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>Preferences</h3>
                  <p>Manage your notification preferences.</p>
                </div>
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                Email Notifications
              </label>
            </div>

            {/* SECURITY */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h3>Security</h3>
                  <p>Manage your account security.</p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Current Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      style={{ paddingRight: "45px" }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}
                    >
                      {showCurrentPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password</label>

                  <div style={{ position: "relative" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{ paddingRight: "45px" }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}
                    >
                      {showNewPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>

              </div>

              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  if (!currentPassword || !newPassword || !confirmNewPassword) {
                    setSettingsMessage("Please fill all password fields.");
                    return;
                  }

                  if (newPassword !== confirmNewPassword) {
                    setSettingsMessage("New passwords do not match.");
                    return;
                  }

                  setSettingsMessage("Password change request submitted successfully.");
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                }}
              >
                Change Password
              </button>
            </div>

            {/* SAVE */}
            <div style={{ marginTop: "20px" }}>
              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  setSettingsMessage("Settings saved successfully.");
                }}
              >
                Save Settings
              </button>

              {settingsMessage && (
                <p style={{ marginTop: "10px", textAlign: "center" }}>
                  {settingsMessage}
                </p>
              )}
            </div>
          </>
        );

      default:
        return <Dashboard />;
    }
  };

  // ==================================================
  // MAIN RETURN
  // ==================================================
  // ==================================================
  // MAIN RETURN
  // ==================================================

  if (!loggedInNgo) {
    return (
      <Login
        onLogin={(ngo) => {
          setLoggedInNgo(ngo);
        }}
      />
    );
  }

  return (
    <div className="app">
      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <div className="logo-box">
            N
          </div>

          <div>

            <h2>
              NGO Impact
            </h2>

            <span>
              CRM Platform
            </span>

          </div>

        </div>

        <div className="sidebar-menu">

          {menuItems.map((section) => (

            <div
              className="menu-section"
              key={section.section}
            >

              <div className="menu-title">
                {section.section}
              </div>

              {section.items.map((item) => (

                <button
                  key={item.id}
                  className={`menu-item ${activePage === item.id
                    ? "active"
                    : ""
                    }`}
                  onClick={() =>
                    setActivePage(item.id)
                  }
                >

                  <span className="menu-icon">
                    {item.icon}
                  </span>

                  <span>
                    {item.label}
                  </span>

                </button>

              ))}

            </div>

          ))}

        </div>

        <div className="sidebar-footer">

          <span className="online-dot"></span>

          System Online

        </div>

      </aside>

      {/* MAIN */}

      <main className="main-content">

        {/* TOPBAR */}

        <header className="topbar">

          <div className="breadcrumb">

            <span>
              NGO Impact CRM
            </span>

            <span>
              /
            </span>

            <strong>

              {menuItems
                .flatMap(
                  (section) =>
                    section.items
                )
                .find(
                  (item) =>
                    item.id === activePage
                )?.label ||
                "Dashboard"}

            </strong>

          </div>

          <div className="topbar-right">

            <span className="notification">
              🔔
            </span>

            <div className="admin-profile">

              <div className="admin-avatar">
                {(loggedInNgo?.ngoName || "N").charAt(0).toUpperCase()}
              </div>

              <div>

                <strong>
                  {loggedInNgo?.ngoName || "Admin"}
                </strong>

                <span>
                  NGO Administrator
                </span>

              </div>

            </div>

            <button
              type="button"
              className="text-button"
              onClick={logout}
              title="Logout"
            >
              Logout
            </button>

          </div>

        </header>

        {/* CONTENT */}

        <section className="content-area">

          {renderPage()}

        </section>

        {/* FOOTER */}

        <footer className="app-footer">

          <span>
            NGO Impact CRM
          </span>

          <span>
            Social Impact Management Platform • 2026
          </span>

        </footer>

      </main>

    </div>
  );
}

export default App;