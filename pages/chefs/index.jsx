import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import ChefListComponent from "../../src/components/Layouts/chef/ChefList";
import { VscLoading } from "react-icons/vsc";
import FoodHeader from "../../src/components/Layouts/Header/HomeHeader";
function ChefList() {
    const router = useRouter();
    const categoryId = 2;
    // const {categoryId} = router.query || []
    useEffect(() =>{
        if(router.isReady){
        console.log("categoryId: "+categoryId)}
    })
    return (
        <div>
            <FoodHeader />
           { categoryId ? <ChefListComponent categoryID={categoryId} />  : 
            <div className="flex items-center justify-center">
                <VscLoading className="text-3xl"/>
            </div>
           }
        </div>
    )
}

export default ChefList
