import React from "react";
import { Route, Routes } from "react-router-dom";

import AddProducts from "../AddProducts/AddProducts";
import Addtablep from "../AddProducts/Addtablep";
import AddMaterials from "../addmaterials/AddMaterials";
import Addtablem from "../addmaterials/Addtablem";
import Admins from "../admins/Admins";
import Home from "../home/Home";
import ItemsPage from "../items_page/Items";
import Loginpage from "../loginpage/Loginpage";
import Mahsulotnomi from "../mahsulotnomi/Mahsulotnomi";
import Productmahsu from "../mahsulotnomi/Productmahsu";
import Materials from "../materials/Materials";
import NotFound from "../notfound/Not_found";
import Products from "../products/Products";

function Pagess() {
  const token = sessionStorage.getItem("token");
  return (
    <>
      {token ? (
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/product" element={<Products />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/addmaterials" element={<AddMaterials />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="/mahsulotnomi" element={<Mahsulotnomi />} />
          <Route path="/productmahsulot" element={<Productmahsu />} />
          <Route path="/items/:id" element={<ItemsPage />} />
          <Route path="/material/:id" element={<Addtablem />} />
          <Route path="/product/:id" element={<Addtablep />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/loginpage" element={<Loginpage />} />
        </Routes>
      )}
    </>
  );
}

export default Pagess;
