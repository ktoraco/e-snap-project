const MainContent = ({ children}: { children: ReactNode }) => {
  return (
    <div className="main-content">
      { children }
    </div>
  );
};

export default MainContent;