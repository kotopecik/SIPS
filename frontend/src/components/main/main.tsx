import React, {lazy, Suspense} from "react";
import style from "@/components/main/mainStyle.module.scss"
import {Route, Routes} from "react-router";
//import Map from "@/components/Map/Map";
const Header = lazy(() => import("@/components/Header/Header"))
const Authorization = lazy(() => import("@/components/Pages/Authorization"))
const Registration = lazy(() => import("@/components/Pages/Registration"))
const RestoreAccess = lazy(() => import("@/components/Pages/RestoreAccess"))
const Map = lazy(() => import("@/components/Map/Map"))

function Main (){
    return (<>

        <Routes>
            <Route path="/" element={
                <Suspense fallback={<p>Loading...</p>}>
                    <Header />
                    <Suspense fallback={<p>Loading...</p>}><Map /></Suspense>
                </Suspense>

            }/>
            <Route path="/Authorization" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <Authorization />
                    </Suspense>
                }
            />
            <Route path="/registration" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <Registration />
                    </Suspense>
                }
            />
            <Route path="/restoreaccess" element={
                    <Suspense fallback={<p>Loading...</p>}>
                        <RestoreAccess />
                    </Suspense>
                }
            />
        </Routes>

    </>)
}

export default Main
