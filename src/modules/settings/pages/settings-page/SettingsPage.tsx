export function SettingsPageContent() {
  return (
    <section className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-lg border p-3">
            <nav className="flex flex-col space-y-1">
              <button className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-secondary text-secondary-foreground">
                Account
              </button>
              <button className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground">
                Appearance
              </button>
              <button className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground">
                Notifications
              </button>
              <button className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground">
                Security
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
