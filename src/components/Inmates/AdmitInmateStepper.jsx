import { useEffect, useRef, useState } from "react";
import { createDraft, updateDraft, loadDraft } from "@/services/admissionDrafts";
import { useAuth } from "@/context/AuthContext";

/* -------------------- */
/* STEP COMPONENTS */
/* -------------------- */

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-sm text-neutral-400">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white"
    />
  </div>
);

const TextArea = ({ label, name, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm text-neutral-400">{label}</label>
    <textarea
      rows={3}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white"
    />
  </div>
);

/* -------------------- */
/* STEPS */
/* -------------------- */

const BasicStep = ({ form, setForm }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input label="Full Name" name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
    <Input label="Age" type="number" name="age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
    <Input label="Gender" name="gender" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} />
    <Input label="Aadhaar Number" name="aadhaar" value={form.aadhaar} onChange={e => setForm({ ...form, aadhaar: e.target.value })} />
  </div>
);

const FamilyStep = ({ form, setForm }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input label="Father Name" name="fatherName" value={form.fatherName} onChange={e => setForm({ ...form, fatherName: e.target.value })} />
    <Input label="Mother Name" name="motherName" value={form.motherName} onChange={e => setForm({ ...form, motherName: e.target.value })} />
    <Input label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={e => setForm({ ...form, maritalStatus: e.target.value })} />
    <Input label="Spouse Name" name="spouseName" value={form.spouseName} onChange={e => setForm({ ...form, spouseName: e.target.value })} />
  </div>
);

const MedicalStep = ({ form, setForm }) => (
  <div className="space-y-4">
    <Input label="Disease Type" name="diseaseType" value={form.diseaseType} onChange={e => setForm({ ...form, diseaseType: e.target.value })} />
    <Input label="Suicide Risk" name="suicideRisk" value={form.suicideRisk} onChange={e => setForm({ ...form, suicideRisk: e.target.value })} />
    <TextArea label="Medical Notes" name="medicalNotes" value={form.medicalNotes} onChange={e => setForm({ ...form, medicalNotes: e.target.value })} />
  </div>
);

const AdmissionStep = ({ form, setForm }) => (
  <div className="space-y-4">
    <Input label="Brought By" name="broughtBy" value={form.broughtBy} onChange={e => setForm({ ...form, broughtBy: e.target.value })} />
    <Input label="Relationship" name="relationship" value={form.relationship} onChange={e => setForm({ ...form, relationship: e.target.value })} />
    <Input label="Contact Number" name="contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
    <TextArea label="Reason for Admission" name="reason" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
  </div>
);

/* -------------------- */
/* STEPS CONFIG */
/* -------------------- */

const steps = [
  { title: "Basic", component: BasicStep },
  { title: "Family", component: FamilyStep },
  { title: "Medical", component: MedicalStep },
  { title: "Admission", component: AdmissionStep },
];

/* -------------------- */
/* MAIN COMPONENT */
/* -------------------- */

const AdmitInmateStepper = ({ onClose, draftId: existingDraft }) => {
  const { user } = useAuth();

  const [draftId, setDraftId] = useState(existingDraft || null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const creatingRef = useRef(false);
  const StepComponent = steps[step].component;

  /* LOAD DRAFT */
  useEffect(() => {
    if (!existingDraft) return;
    loadDraft(existingDraft).then(data => {
      if (!data) return;
      setForm(data.formData || {});
      setStep(data.step || 0);
    });
  }, [existingDraft]);

  /* CREATE DRAFT (SAFE) */
  useEffect(() => {
    if (draftId || !Object.keys(form).length || creatingRef.current) return;

    creatingRef.current = true;
    createDraft(user, form).then(id => {
      setDraftId(id);
      creatingRef.current = false;
    });
  }, [form, draftId, user]);

  /* AUTO SAVE */
  useEffect(() => {
    if (!draftId) return;

    const t = setTimeout(() => {
      setSaving(true);
      updateDraft(draftId, { formData: form, step })
        .finally(() => setSaving(false));
    }, 600);

    return () => clearTimeout(t);
  }, [form, step, draftId]);

  /* CLOSE */
  const handleClose = () => {
    if (Object.keys(form).length && !confirm("Draft saved. Close anyway?")) return;
    onClose();
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Admit New Inmate</h2>
        <button onClick={handleClose} className="text-neutral-400 hover:text-white">✕</button>
      </div>

      {/* STEPPER BAR */}
      <div className="flex gap-2">
        {steps.map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded ${i <= step ? "bg-indigo-500" : "bg-neutral-800"}`} />
        ))}
      </div>

      {/* STEP CONTENT */}
      <StepComponent form={form} setForm={setForm} />

      {/* FOOTER */}
      <div className="flex justify-between pt-4 border-t border-neutral-800">
        <button
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="px-4 py-2 bg-neutral-800 rounded disabled:opacity-40"
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              console.log("FINAL SUBMIT:", form);
              onClose();
            }}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          >
            Admit Inmate
          </button>
        )}
      </div>

      {saving && <p className="text-xs text-neutral-400">Saving draft…</p>}
    </div>
  );
};

export default AdmitInmateStepper;
