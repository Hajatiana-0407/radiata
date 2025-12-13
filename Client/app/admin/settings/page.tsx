'use client';

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your site settings and content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Site name, contact information, and other general settings will appear here.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Content Settings</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage homepage hero, values, and other site content from here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
