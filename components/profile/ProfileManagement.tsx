'use client';

import React from 'react';
import { ClientUser } from '@/assets/types';
import UpdateProfileForm from '../forms/UpdateProfileForm';
import DeleteProfileForm from '../forms/DeleteProfileForm';
import { getProfile } from '@/actions/addressAndProfileActions';
import { toast } from 'react-toastify'; // Import toast here

const ProfileManagement: React.FC = () => {
     const [loading, setLoading] = React.useState<boolean>(true);
     const [profile, setProfile] = React.useState<ClientUser>();
     const [refresh, setRefresh] = React.useState<boolean>(false); // Added to handle refresh

     React.useEffect(() => {
       const getProfileData = async () => {
         try {
           const data = await getProfile();
           if (data.user) {
             setProfile(data.user);
             setLoading(false);
           }
         } catch (error) {
           toast.error('could not get data from db'); // Display error toast
         }
       };
       getProfileData();
     }, [refresh]); // Added refresh to dependency array

     const handleRefresh = () => setRefresh(!refresh); // Toggle refresh state

  return loading ? (
    <div className="w-full flex justify-center items-center my-8">
      <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
    </div>
  ) : (
    <div className="flex flex-col px-4 gap-y-6 justify-center items-center my-4 w-full">
      <h1 className="font-man capitalize text-xl md:text-2xl lg:text-3xl font-light">
        Manage Profile
      </h1>
      <div className="w-4/5 bg-[#f7f5eb] flex flex-col justify-center items-center p-10 gap-y-4 rounded-md">
        <UpdateProfileForm profile={profile} />
        <DeleteProfileForm onProfileDeleted={handleRefresh} />
      </div>
    </div>
  );
};

export default ProfileManagement;
