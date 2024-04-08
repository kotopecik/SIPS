import React, {lazy, Suspense, useEffect} from "react";
import {Route, Routes} from "react-router";
import {Loading} from "@/components/main/Loading/Loading";
import {useAppDispatch} from "@/hooks/hook";
import {setCursorPosition} from "@/store/cursor/cursor-slice";
import Navbar from "@/components/navbar";
import {fetchDates} from "@/store/tile/tile-actions";
import {EUrls} from "@/enums/EUrls";


const Header = lazy(() => import("@/components/Header"))
const Authorization = lazy(() => import("@/components/Pages/Authorization"))
const Registration = lazy(() => import("@/components/Pages/Registration"))
const RestoreAccess = lazy(() => import("@/components/Pages/RestoreAccess"))
const UserGuide = lazy(() => import("@/components/Pages/UserGuide/UserGuide"))
const AboutUs = lazy(() => import("@/components/Pages/AboutUs"))
const Map = lazy(() => import("@/components/Map/Map"))
const Profile = lazy(() => import("@/components/Pages/Profile"))



function Main (){

    const dispatch = useAppDispatch()

    const handleMouseMove = (event) => {
        dispatch(setCursorPosition({ x: event.clientX, y: event.clientY }));
    };

    useEffect(() => {
        dispatch(fetchDates(EUrls.DATES_URL))
    })




    return (<div onMouseMove={handleMouseMove}>


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
                    <Suspense fallback={<Loading/>}><Navbar /></Suspense>
                    <Suspense fallback={<Loading/>}><UserGuide /></Suspense>
                </Suspense>
                }
            />
            <Route path="/home" element={
                <Suspense fallback={<Loading/>}>
                    <Suspense fallback={<Loading/>}><Navbar /></Suspense>
                    <Suspense fallback={<Loading/>}><AboutUs /></Suspense>
                </Suspense>
                }
            />
            <Route path="/profile" element={
                <Suspense fallback={<Loading/>}>
                    <Suspense fallback={<Loading/>}><Navbar /></Suspense>
                    <Suspense fallback={<Loading/>}><Profile /></Suspense>
                </Suspense>
                }
            />
        </Routes>

    </div>)
}

export default Main
