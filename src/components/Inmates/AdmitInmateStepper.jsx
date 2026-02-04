import { useEffect, useRef, useState } from "react";
import {
  createDraft,
  updateDraft,
  loadDraft,
  deleteDraft,
} from "@/services/admissionDrafts";
import { createInmate } from "@/services/inmates";
import { uploadInmatePhoto } from "@/services/storage";
import { useAuth } from "@/context/AuthContext";

/* ---------- helpers ---------- */

const calcAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
};

/* ---------- inputs ---------- */

const Input = ({ label, value, onChange, type = "text", disabled }) => (
  <div className="space-y-1">
    <label className="text-sm text-neutral-400">{label}</label>
    <input
      type={type}
      value={value || ""}
      disabled={disabled}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white disabled:opacity-50"
    />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm text-neutral-400">{label}</label>
    <textarea
      rows={3}
      value={value || ""}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white"
    />
  </div>
);

/* ---------- step 1: basic ---------- */

const Basic = ({ form, setForm }) => {
  const handleDob = (dob) => {
    setForm({
      ...form,
      dob,
      age: calcAge(dob),
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Input label="Full Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <Input label="Gender" value={form.gender}
        onChange={e => setForm({ ...form, gender: e.target.value })} />

      <Input label="Date of Birth" type="date"
        value={form.dob}
        onChange={e => handleDob(e.target.value)} />

      <Input label="Age" value={form.age} disabled />
    </div>
  );
};

/* ---------- step 2: personal ---------- */

const Personal = ({ form, setForm }) => (
  <div className="grid grid-cols-2 gap-4">
    <Input label="Marital Status" value={form.maritalStatus}
      onChange={e => setForm({ ...form, maritalStatus: e.target.value })} />

    <Input label="Education" value={form.education}
      onChange={e => setForm({ ...form, education: e.target.value })} />

    <Input label="Occupation" value={form.occupation}
      onChange={e => setForm({ ...form, occupation: e.target.value })} />

    <Input label="Address" value={form.address}
      onChange={e => setForm({ ...form, address: e.target.value })} />
  </div>
);

/* ---------- step 3: family ---------- */

const Family = ({ form, setForm }) => (
  <div className="grid grid-cols-2 gap-4">
    <Input label="Father Name" value={form.fatherName}
      onChange={e => setForm({ ...form, fatherName: e.target.value })} />

    <Input label="Mother Name" value={form.motherName}
      onChange={e => setForm({ ...form, motherName: e.target.value })} />

    <Input label="Guardian Name" value={form.guardianName}
      onChange={e => setForm({ ...form, guardianName: e.target.value })} />

    <Input label="Guardian Phone" value={form.guardianPhone}
      onChange={e => setForm({ ...form, guardianPhone: e.target.value })} />
  </div>
);

/* ---------- step 4: admission ---------- */

const Admission = ({ form, setForm }) => (
  <TextArea label="Reason for Admission"
    value={form.reason}
    onChange={e => setForm({ ...form, reason: e.target.value })} />
);

/* ---------- step 5: mental ---------- */

const Mental = ({ form, setForm }) => (
  <div className="space-y-3">
    <TextArea label="Mental Condition"
      value={form.mentalCondition}
      onChange={e => setForm({ ...form, mentalCondition: e.target.value })} />

    <label className="flex gap-2 items-center">
      <input type="checkbox"
        checked={form.suicidal || false}
        onChange={e => setForm({ ...form, suicidal: e.target.checked })} />
      <span>Suicidal Tendency</span>
    </label>

    <label className="flex gap-2 items-center">
      <input type="checkbox"
        checked={form.violent || false}
        onChange={e => setForm({ ...form, violent: e.target.checked })} />
      <span>Violent Behaviour</span>
    </label>
  </div>
);

/* ---------- steps ---------- */

const steps = [Basic, Personal, Family, Admission, Mental];

/* ---------- main ---------- */

const AdmitInmateStepper = ({ onClose, draftId }) => {
  const { user } = useAuth();

  const [form, setForm] = useState({});
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [draft, setDraft] = useState(draftId || null);
  const [submitting, setSubmitting] = useState(false);

  const Step = steps[step];

  /* load draft */
  useEffect(() => {
    if (!draftId) return;
    loadDraft(draftId).then(d => {
      if (!d) return;
      setForm(d.formData || {});
      setStep(d.step || 0);
      setDraft(draftId);
    });
  }, [draftId]);

  /* autosave */
  useEffect(() => {
    if (!draft) return;
    const t = setTimeout(() => {
      updateDraft(draft, { formData: form, step });
    }, 700);
    return () => clearTimeout(t);
  }, [form, step, draft]);

  /* admit */
  const handleAdmit = async () => {
    if (!photo) return alert("Photo is required");

    try {
      setSubmitting(true);

      const photoURL = await uploadInmatePhoto(photo, user.uid);

      await createInmate({
        ...form,
        photo: photoURL,
        admittedBy: user.uid,
      });

      if (draft) await deleteDraft(draft);
      onClose();

    } catch (e) {
      console.error(e);
      alert("Failed to admit inmate");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">

      <h2 className="text-lg font-semibold">Admit New Inmate</h2>

      {/* photo */}
      <input
        type="file"
        accept="image/*"
        onChange={e => setPhoto(e.target.files[0])}
      />

      <div className="flex gap-2">
        {steps.map((_, i) => (
          <div key={i}
            className={`flex-1 h-1 ${i <= step ? "bg-indigo-500" : "bg-neutral-800"}`} />
        ))}
      </div>

      <Step form={form} setForm={setForm} />

      <div className="flex justify-between pt-4">
        <button disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="px-4 py-2 bg-neutral-800 rounded">
          Back
        </button>

        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)}
            className="px-4 py-2 bg-indigo-600 rounded">
            Next
          </button>
        ) : (
          <button onClick={handleAdmit}
            disabled={submitting}
            className="px-4 py-2 bg-green-600 rounded">
            Admit
          </button>
        )}
      </div>
    </div>
  );
};

export default AdmitInmateStepper;
