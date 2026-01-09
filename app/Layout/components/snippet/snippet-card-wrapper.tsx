import React from "react";

const SnippetCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
<div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
  {children}
</div>

  );
};

export default SnippetCardWrapper;
