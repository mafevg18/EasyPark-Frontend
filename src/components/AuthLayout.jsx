function AuthLayout({ children }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/f1/4b/8c/f14b8ce2bafbcdfa22f01c5142e48e7c.jpg')"
      }}
    >

      {/* overlay oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative">
        {children}
      </div>

    </div>
  );
}

export default AuthLayout;