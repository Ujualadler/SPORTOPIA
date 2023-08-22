import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Useraxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ViewTournament() {
  const userAxios = Useraxios();
  const { id } = useParams();
  const clubId = useSelector((state) => state.Club.clubId);
  const [tournamentData, setTournamentData] = useState("");
  const [join, setJoin] = useState(false);

  useEffect(() => {
    const getData = async (req, res) => {
      try {
        const res = await userAxios.get(`/getTournamentDetails?id=${id}&clubId=${clubId}`);
        console.log(res.data.result, "response available");
        if (res.data.result) {
          setTournamentData(res.data.result);
          setJoin(res.data.status)
        } else if(res.data.data){
          setTournamentData(res.data.data);
          setJoin(res.data.status)
        }else if(res.data.joined){
          setTournamentData(res.data.joined);
          setJoin(res.data.status)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  function convertISODateToReadable(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  function formatTimeTo12Hr(timeStr) {
    if (!timeStr) {
      return "";
    }

    const [hours, minutes] = timeStr.split(":");
    const parsedHours = parseInt(hours);
    const period = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours =
      parsedHours === 0
        ? 12
        : parsedHours > 12
        ? parsedHours - 12
        : parsedHours;

    return `${formattedHours}:${minutes} ${period}`;
  }

  const handleDownloadClick = () => {
    if (tournamentData?.detailedDocument) {
      // Construct the Cloudinary URL with download transformation
      const cloudinaryUrl = `${tournamentData.detailedDocument}?fl_attachment=true`;
    
      // Create a hidden anchor element and click it to trigger the download
      const a = document.createElement('a');
      a.href = cloudinaryUrl;
      a.download = 'detailed_document.pdf';
      a.click();
    }
  };

  const joinTournament=async(id)=>{
    try {
      const response=await userAxios.post(`/joinTournament`,{clubId,id})
      if(response.data.result==='success'){
        toast.success('Successfully joined')
      }else if(response.data.result==='joined'){
        toast.error('You are already part of this tournament')
      }else{
        toast.error('Failed to join')
      }
    } catch (error) {
      
    }
  }

  const leaveTournament=async()=>{
    try {
      const response=await userAxios.get(`/leaveTournament?id=${id}&clubId=${clubId}`)
      if(response){
        
      }
    } catch (error) {
      
    }
  }
  
  return (
    <>
      <div className="flex justify-center  ">
        <div className="mt-8 mx-3 hidden md:block  md:text-xl text-white font-bold tracking-wide">
          {tournamentData?.tournamentName}
        </div>
      </div>
      <div className="text-white bg-gray-900 bg-opacity-60 m-2 md:p-8 p-4">
        <h2 className="m-2 font-bold">ABOUT</h2>
        <h4 className="m-2">{tournamentData?.description}</h4>
      </div>
      <div className="bg-black bg-opacity-60 m-2 md:p-3 p-5">
        <ul className="max-w-md divide-y ml-auto mr-auto divide-gray-200 dark:divide-gray-700">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  SPORTS TYPE
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {tournamentData?.sportsType}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  MAXIMUM ALLOWED TEAMS
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {tournamentData?.maximumTeams}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  STARTING DATE
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {convertISODateToReadable(tournamentData?.startingDate)}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  ENDING DATE
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {convertISODateToReadable(tournamentData?.endingDate)}
              </div>
            </div>
          </li>
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  STARTING TIME
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {formatTimeTo12Hr(tournamentData?.startingTime)}
              </div>
            </div>
          </li>
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  ENDING TIME
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {formatTimeTo12Hr(tournamentData?.endingTime)}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex justify-around bg-gray-900 bg-opacity-60 m-2 p-3 text-white ">
        <button  onClick={handleDownloadClick}className="md:text-md md:font-bold bg-black bg-opacity-60 h-[2rem] w-[13rem] rounded-sm text-sm">
          DOWNLOAD DETAILED PDF
        </button>
        {/* <a href={tournament.detailedDocument} target="_blank" rel="noopener noreferrer">View PDF</a> */}
        {join===true?<button onClick={()=>joinTournament(tournamentData._id)} className="font-bold bg-red-900 h-[2rem] w-[5rem] rounded-sm">
          JOIN
        </button>:join==='join'?<button onClick={leaveTournament} className="font-bold bg-red-900 h-[2rem] w-[5rem] rounded-sm" >LEAVE</button>:''}
      </div>
    </>
  );
}

export default ViewTournament;
