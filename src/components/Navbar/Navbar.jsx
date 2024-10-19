const FloatingNav = ({ navItems, className }) => {
  return (
    <div
      className={`fixed top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border shadow-md flex items-center justify-between ${
        className || ""
      }`}
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        width: "20vw", // Adjust width to provide enough space for the items
        height: "50px",
        color: "white",
        left: "50%",
        display: "flex",
        justifyContent: "space-around", // Ensure equal spacing between items
        alignItems: "center", // Center items vertically
      }}>
      {navItems.map((navItem, idx) => (
        <a
          key={idx}
          href={navItem.link}
          className="flex items-center justify-center space-x-2 text-neutral-600 dark:text-neutral-50 hover:text-neutral-500 dark:hover:text-neutral-300"
          style={{ textAlign: "center" }}>
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="text-lg cursor-pointer">{navItem.name}</span>
        </a>
      ))}
    </div>
  );
};

export default FloatingNav;
