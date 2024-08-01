"use client"
import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { postData } from '../lib/api';
import { getAllBrands } from '../lib/endpoints';
import { fetchFailure, fetchStart, fetchSuccess } from '../ui/slice';
import { enqueueSnackbar } from 'notistack';
import Image from 'next/image';
import { externalImageLoader } from '../lib/data';
import Link from 'next/link';
import { BrandCollectionPage } from '../ui/skeleton';

function BrandCollection() {

    const { allBrands } = useAppSelector((state) => state.commonSlice);
    const dispatch = useAppDispatch();
    
    const fetchAllBrands = useCallback( async () => {
      let key = "allBrands";
  
      dispatch(fetchStart(key));
      try {
        const response = await postData(getAllBrands);
        dispatch(fetchSuccess({ key, data: response?.data }));
      } catch (e) {
        dispatch(fetchFailure({ key, error: e?.message }));
        enqueueSnackbar(e.message, { variant: "error" });
      }
    },[dispatch])
  
    useEffect(()=>{
      fetchAllBrands()
    },[fetchAllBrands])

    if(allBrands.loading){
      return(
        <div>
            <BrandCollectionPage/>
        </div>
      )
    }
    

  return (
    <div className='container mx-auto px-3'>
      <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2'>
          {
          allBrands?.data?.length > 0 ? allBrands.data.map((brand, i)=>{
              return(
                <div className='my-5 mx-3 shadow-lg' key={i}>
                  <Link href={`/${brand.brandkey}`} >
                    <Image className='block m-auto' src={brand.logo} loader={externalImageLoader} width={200} height={200} alt="" /> 
                  </Link>
                </div>
              )
            }): null
          } 
      </div>
    </div>
  )
}

export default BrandCollection