import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

//prettier ignore
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseApp, authDb } from "../firebase-config";

import Spinner from "./Spinner";
import { categories } from "./Sidebar";
import { doc, setDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const CreatePin = ({ user }) => {

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [videoAsset, setVideoAsset] = useState(null);
  const [wrongVideoType, setWrongVideoType] = useState(false);

  const navigate = useNavigate();
  const storage = getStorage(firebaseApp);
  const {userInfo} = UserAuth();

  const UploadVideo = (e) => {
    setLoading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default: break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoAsset(downloadURL);
          setLoading(false);
        });
      }
    )
  };

  const deleteVideo = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef).then(() => {
      setVideoAsset(null);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {}, [title, about, category]);

  const savePin = async () => {
    try{
      setLoading(true);
      if(!title && !about && !category && !videoAsset){
        setFields(true);
        setLoading(false);
        setWrongVideoType(true);
      }else{
        const data = {
          id : `${Date.now()}`,
          title : title,
          userId : user?.uid,
          category : category,
          about: about,
          videoUrl : videoAsset,
        };

        await setDoc(doc(authDb, 'videos', `${Date.now()}`), data);
        setLoading(false);
        navigate('/dashboard', { replace: false });
      }
    }catch(error){
      console.log(error);
    }
  };

  return(
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          please fill in all the fields.
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongVideoType && <p className="text-red-500">Wrong video type</p> }
            {!videoAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400 text-center">
                    Use high quality videos of type mp4, mov, mkv, flv, wmv, avi or any video format
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-video"
                  onChange={UploadVideo}
                  accept="video/mp4,video/x-m4v,video/x-flv,video/*"
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <div className="flex w-full h-full items-center justify-center relative bg-white">
                  <video src={videoAsset}
                  controls
                  className='w-full h-full' />
                </div>
                <button
                  type="button"
                  className="absolute botton-3 right-3 p-3 rounded-full bg-white text-xl text-gray-600 hover:text-white cursor-pointer outline-none hover:shadow-md transition-full duration-500 ease-in-out"
                  onClick={deleteVideo}>
                    <MdDelete />
                  </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title here..."
            className='outline-none text-2xl sm:text-lg font-medium border-b-2 border-gray-200 p-2'
          />
          {user && (
            <div className="flex gap-3 my-2 items-center bg-white rounded-lg">
              <img src={user?.photoURL} alt="profile" className="w-14 h-11 rounded-full" />
              <p className="font-medium">{user.displayName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your video about?"
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                Choose Pin Category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
                  <option value="other" className="bg-white">
                    Seleect Category
                  </option>
                  {categories.map((category) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-[#f1b23bea] border-none text-white font-semibold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
