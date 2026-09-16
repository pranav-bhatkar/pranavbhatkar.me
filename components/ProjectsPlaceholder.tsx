/**
 * Shown on both project surfaces while `data/projectsData.ts` is empty.
 * Refilling that array brings the normal project rendering back on its own.
 */
function ProjectsPlaceholder() {
    return (
        <div className="rounded-md border border-border px-6 py-10 text-center">
            <p className="font-sans text-sm text-muted-foreground">
                I'm reworking this section right now.
            </p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
                New projects go up on 20 September 2026, so check back then.
            </p>
        </div>
    )
}

export default ProjectsPlaceholder
