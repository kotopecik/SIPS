import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router";
import {Loading} from "@/components/main/Loading/Loading";

const Header = lazy(() => import("@/components/Header"))
const Authorization = lazy(() => import("@/components/Pages/Authorization"))
const Registration = lazy(() => import("@/components/Pages/Registration"))
const RestoreAccess = lazy(() => import("@/components/Pages/RestoreAccess"))
const UserGuide = lazy(() => import("@/components/Pages/UserGuide/UserGuide"))
const Map = lazy(() => import("@/components/Map/Map"))

function Main (){
    return (<>

        <Routes>
            <Route path="/" element={
                <Suspense fallback={<Loading/>}>
                    <Suspense fallback={<Loading/>}><Header /></Suspense>
                    <Suspense fallback={<Loading/>}><Map /></Suspense>
                </Suspense>

            }/>
            <Route path="/Authorization" element={
                    <Suspense fallback={<Loading/>}>
                        <Authorization />
                    </Suspense>
                }
            />
            <Route path="/registration" element={
                    <Suspense fallback={<Loading/>}>
                        <Registration />
                    </Suspense>
                }
            />
            <Route path="/restoreaccess" element={
                    <Suspense fallback={<Loading/>}>
                        <RestoreAccess />
                    </Suspense>
                }
            />
            <Route path="/management" element={
                    <Suspense fallback={<Loading/>}>
                        <UserGuide />
                    </Suspense>
                }
            />
        </Routes>

    </>)
}

export default Main
