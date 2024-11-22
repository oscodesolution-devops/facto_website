import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos"; 
import "aos/dist/aos.css"; 
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  // NavigationMenuTrigger,
  // NavigationMenuContent,
} from "./ui/navigation-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const [isLoggedIn] = useState(true);
  const user = {
    name: "John Doe",
    avatar: "./assets/user.png",
  };

  const activeClass = "text-green-500 underline";
  const defaultClass = "text-primary hover:text-secondary";
  useEffect(() => {
    AOS.init({
      duration: 400, 
    });
  }, []);

  return (
    <nav 
      className="bg-white h-[108px] border border-primary flex items-center justify-between px-6 sm:px-4 md:px-6 lg:px-8 xl:px-[40px]"
      style={{ fontFamily: "Erode Variable" }}
      data-aos="fade-down" 
    >
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="w-[190px] h-[101px]" />
      </div>

      <div className="flex items-center justify-between w-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex text-xl gap-[22px] py-[42px] pb-[34px] font-medium leading-base">
            <NavigationMenuItem>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Home
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                >
                  Services
                </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Courses
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Contact
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Pricing
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/update"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Update
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/active-plans"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Active Plans
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {isLoggedIn ? (
          <NavLink to="/profile">
            <div className="ml-4 w-[60px] h-[60px]">
              <Avatar
                className="cursor-pointer w-[60px] h-[60px] hover:shadow-[0px_6px_15px_rgba(0,0,0,0.4)] transition-shadow duration-300 ease-in-out"
              >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button
              className="ml-4 bg-primary font-[inter] text-white text-base font-[16.15px] leading-base w-[122px] h-[43.85px] rounded-[30px] border-[1.15px solid #3AB54A]"
              style={{
                padding: "10.38px 36.92px",
                gap: "11.54px",
              }}
            >
              Log In
            </button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
