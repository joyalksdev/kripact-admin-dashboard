import { useEffect, useRef, useState } from "react";

/* ---------- REUSABLE UI ---------- */

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-wide text-neutral-400">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2.5 rounded-lg bg-neutral-900
        border border-neutral-800 text-white
        focus:outline-none focus:ring-1 focus:ring-indigo-500
        placeholder:text-neutral-600"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-wide text-neutral-400">
      {label}
    </label>
    <div className="relative">
      <select
        {...props}
        className="w-full px-3 py-2.5 pr-8 rounded-lg bg-neutral-900
          border border-neutral-800 text-white
          focus:outline-none focus:ring-1 focus:ring-indigo-500
          appearance-none"
      >
        {children}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
        ▾
      </span>
    </div>
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div className="space-y-1 md:col-span-2">
    <label className="text-xs uppercase tracking-wide text-neutral-400">
      {label}
    </label>
    <textarea
      {...props}
      rows={3}
      className="w-full px-3 py-2.5 rounded-lg bg-neutral-900
        border border-neutral-800 text-white
        focus:outline-none focus:ring-1 focus:ring-indigo-500
        resize-none"
    />
  </div>
);

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h3 className="text-sm font-semibold text-white border-b border-neutral-800 pb-2">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </section>
);

/* ---------- MAIN FORM ---------- */

const AdmitInmateForm = ({ onClose }) => {
  const [form, setForm] = useState({});
  const [dirty, setDirty] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setDirty(true);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    if (dirty) {
      const ok = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!ok) return;
    }
    onClose?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM DATA:", form);
    setDirty(false);
    onClose?.();
  };

  /* Prevent accidental ESC close */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dirty]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-8 max-h-[80vh] overflow-y-auto pr-2"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Admit New Inmate
        </h2>
        <button
          type="button"
          onClick={handleClose}
          className="text-neutral-400 hover:text-white text-lg"
        >
          ✕
        </button>
      </div>

      {/* BASIC INFO */}
      <Section title="Basic Information">
        <Input label="Full Name" name="name" onChange={handleChange} />
        <Input
          label="Age"
          name="age"
          inputMode="numeric"
          placeholder="Years"
          onChange={handleChange}
        />
        <Select label="Gender" name="gender" onChange={handleChange}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Select>
        <Input label="Aadhaar Number" name="aadhaar" onChange={handleChange} />
      </Section>

      {/* FAMILY */}
      <Section title="Family Details">
        <Input label="Father Name" name="fatherName" onChange={handleChange} />
        <Input label="Mother Name" name="motherName" onChange={handleChange} />
        <Select
          label="Marital Status"
          name="maritalStatus"
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Unmarried</option>
          <option>Married</option>
          <option>Divorced</option>
        </Select>
        <Input label="Spouse Name" name="spouseName" onChange={handleChange} />
      </Section>

      {/* MEDICAL */}
      <Section title="Medical Information">
        <Select label="Disease Type" name="diseaseType" onChange={handleChange}>
          <option value="">Select</option>
          <option>Mental</option>
          <option>Physical</option>
          <option>Age-related</option>
        </Select>
        <Select label="Suicide Risk" name="suicideRisk" onChange={handleChange}>
          <option value="">Select</option>
          <option>No</option>
          <option>Yes</option>
        </Select>
        <TextArea
          label="Symptoms / Medical Notes"
          name="medicalNotes"
          onChange={handleChange}
        />
      </Section>

      {/* ADMISSION */}
      <Section title="Admission Details">
        <Input label="Brought By" name="broughtBy" onChange={handleChange} />
        <Input label="Relationship" name="relationship" onChange={handleChange} />
        <Input label="Contact Number" name="contact" onChange={handleChange} />
        <TextArea
          label="Reason for Admission"
          name="reason"
          onChange={handleChange}
        />
      </Section>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Admit Inmate
        </button>
      </div>
    </form>
  );
};

export default AdmitInmateForm;
