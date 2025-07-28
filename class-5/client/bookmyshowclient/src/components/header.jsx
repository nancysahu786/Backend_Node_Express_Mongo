import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className=" flex flex-row w-full justify-between bg-[#422701]">
        <h1 className="px-[10px]">Header section</h1>
        <div className="flex w-[321px] justify-between text-[20px]">
          <ul className="head-ul flex flex-row justify-evenly w-full list-none items-center">
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link className="text-white" to="/owner">
                Owner
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
