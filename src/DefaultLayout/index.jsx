import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {

  let screenWidth = window.innerWidth;

  return (
    <>
      <div>
        
        <main>
          <Outlet />
        </main>

      </div>
    </>
  )
}
