"use client";

import { useState, useTransition } from "react";
import { Button } from "@gio4x/ui";
import { updateProfile } from "@/lib/profile-actions";

export type ProfileInit = {
  full_name: string;
  phone: string | null;
  country: string | null;
  language: string;
  timezone: string;
  avatar_url: string | null;
};

export function ProfileEditForm({ initial }: { initial: ProfileInit }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateProfile(fd);
      if (res.ok) {
        setSuccess(res.message ?? "Saved.");
        setOpen(false);
      } else {
        setError(res.error);
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-medium text-sky hover:underline"
      >
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-2 space-y-3">
      <Field name="full_name" label="Full name" defaultValue={initial.full_name} required />
      <Field name="phone" label="Phone" defaultValue={initial.phone ?? ""} />
      <Field name="country" label="Country (ISO code, e.g. IN)" defaultValue={initial.country ?? ""} />
      <Field name="language" label="Language (e.g. en)" defaultValue={initial.language} />
      <Field name="timezone" label="Timezone (e.g. Asia/Kolkata)" defaultValue={initial.timezone} />
      <Field name="avatar_url" label="Avatar URL" defaultValue={initial.avatar_url ?? ""} />

      {error ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          {success}
        </div>
      ) : null}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-navy"
        >
          Cancel
        </button>
        <Button variant="primary" type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-steel-light">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
      />
    </div>
  );
}
