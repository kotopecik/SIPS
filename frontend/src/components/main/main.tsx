import React from "react";
import style from "@/components/main/mainStyle.module.scss"
import {Route, Routes} from "react-router";
import Map from "@/components/Map/Map";
import Header from "@/components/Header/Header";
import Authorization from "@/components/Pages/Authorization";
import Registration from "../Pages/Registration";
import {RestoreAccess} from "@/components/Pages/RestoreAccess";

function Main (){
    return (<>

        <Routes>
            <Route path="/" element={
                <>
                    <Header />
                    <Map />
                </>

            }/>
            <Route path="/Authorization" element={<Authorization />}></Route>
            <Route path="/registration" element={<Registration />}> </Route>
            <Route path="/restoreaccess" element={<RestoreAccess />}> </Route>
        </Routes>

    </>)
}

export default Main
