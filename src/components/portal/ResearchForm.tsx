"use client";

import { useActionState, useState } from "react";

import { saveResearch, type PortalActionState } from "@/app/actions/portal/research";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/portal/document-builders";
import type { PortalResearchListItem } from "@/lib/portal/data";

const initialState: PortalActionState = { success: false, message: "" };

const statuses = [
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "planned", label: "Planned" },
] as const;

type ResearchFormProps = {
  project?: PortalResearchListItem;
};

export function ResearchForm({ project }: ResearchFormProps) {
  const [state, formAction, pending] = useActionState(saveResearch, initialState);
  const [slug, setSlug] = useState(project?.slug ?? "");

  return (
    <form action={formAction} className="surface-card space-y-6 p-8">
      {project?._id ? <input type="hidden" name="id" value={project._id} /> : null}

      <div>
        <h2 className="text-h3 font-medium">{project ? "Edit research project" : "New research project"}</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Ongoing projects appear on the homepage (up to two). All projects are listed on the research page.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="research-title" className="block text-sm font-medium text-ink">
            Project title
          </label>
          <input
            id="research-title"
            name="title"
            type="text"
            required
            defaultValue={project?.title}
            className="input-field mt-2"
            onBlur={(blurEvent) => {
              if (!slug) setSlug(slugify(blurEvent.target.value));
            }}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="research-slug" className="block text-sm font-medium text-ink">
            URL slug
          </label>
          <input
            id="research-slug"
            name="slug"
            type="text"
            required
            value={slug}
            onChange={(changeEvent) => setSlug(slugify(changeEvent.target.value))}
            className="input-field mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="research-description" className="block text-sm font-medium text-ink">
            Short description
          </label>
          <textarea
            id="research-description"
            name="description"
            rows={3}
            defaultValue={project?.description}
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor="research-status" className="block text-sm font-medium text-ink">
            Status
          </label>
          <select
            id="research-status"
            name="status"
            required
            defaultValue={project?.status ?? "ongoing"}
            className="input-field mt-2"
          >
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="research-start-date" className="block text-sm font-medium text-ink">
            Start date
          </label>
          <input
            id="research-start-date"
            name="startDate"
            type="date"
            defaultValue={project?.startDate?.slice(0, 10)}
            className="input-field mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="research-pi" className="block text-sm font-medium text-ink">
            Principal investigator
          </label>
          <input
            id="research-pi"
            name="principalInvestigator"
            type="text"
            defaultValue={project?.principalInvestigator}
            placeholder="Dr. Kumar Prafull Chandra"
            className="input-field mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="research-body" className="block text-sm font-medium text-ink">
            Full description
          </label>
          <textarea
            id="research-body"
            name="body"
            rows={8}
            defaultValue={project?.bodyText}
            placeholder="Write one paragraph per block. Separate paragraphs with a blank line."
            className="input-field mt-2"
          />
        </div>
      </div>

      {state.message ? (
        <p
          className={`text-sm ${state.success ? "text-success" : "text-danger"}`}
          role={state.success ? "status" : "alert"}
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : project ? "Update project" : "Publish project"}
        </Button>
      </div>
    </form>
  );
}
