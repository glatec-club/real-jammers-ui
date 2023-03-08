import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { IoHome, IoPlay, IoPause } from "react-icons/io5";
import {
  MdOutlineReplay10,
  MdForward10,
  MdVolumeUp,
  MdVolumeOff,
  MdFullscreen,
} from "react-icons/md";
import Spinner from "./Spinner";
import { getSpecificVideo } from "../utils/FetchData";
import ReactPlayer from "react-player";
import screenfull from 'screenfull';

import Logo from "../assets/logo2.png";
import {
  Flex,
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Image,
} from "@chakra-ui/react";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`; // 01:02:35
  }
  return `${mm}:${ss}`; // 02:40
};

const PinDetail = () => {
  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);

  // Custom reference
  const playerRef = useRef();
  const playerContainer = useRef();

  useEffect(() => {
    if (videoId) {
      setIsLoading(true);
      getSpecificVideo(videoId).then((data) => {
        setVideoInfo(data);
        console.log(data);
        setIsLoading(false);
      });
    }
  }, [videoId]);

  useEffect(() => {}, [muted, volume, played]);

  const onvolumechange = (e) => {
    setVolume(parseFloat(e / 100));
    e === 0 ? setMuted(true) : setMuted(false);
  };

  const handleFastRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    //console.log(changeState);
    if (!seeking) {
      setPlayed(parseFloat(changeState.played / 100) * 100);
    }
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e / 100));
  };
  const onSeekMouseDown = (e) => {
    setSeeking(true);
  };
  const onSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(e / 100);
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex w-full h-auto justify-center items-center flex-col py-2 px-4">
      <div className="flex items-center w-full my-4">
        <Link to="/dashboard">
          <IoHome fontSize={25} />
        </Link>
        <div className="w-[1px] h-[25px] bg-gray-500 mx-2"></div>
        <p className="text-semibold w-full">{videoInfo?.title}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="w-full col-span-2">
          <div className="flex w-full bg-black relative" ref={playerContainer}>
            <ReactPlayer
              ref={playerRef}
              url={videoInfo?.videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={muted}
              volume={volume}
              onProgress={handleProgress}
            />

            {/* Video player controls */}
            <div className="flex absolute top-0 left-0 right-0 bottom-0 flex-col justify-between items-center z-[1] cursor-pointer">
              {/* Play icon */}
              <div
                className="flex items-center justify-center w-full h-full"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
              >
                {!isPlaying && (
                  <IoPlay fontSize={60} color="#f2f2f2" cursor={"pointer"} />
                )}
              </div>
              {/* Progress Controls */}
              <Flex
                width={"full"}
                alignItems="center"
                direction={"column"}
                px={4}
                bgGradient="linear(to-t, blackAlpha.900, blackAlpha.500, blackAlpha.50)"
              >
                <Slider
                  aria-label="slider-ex-4"
                  value={played * 100}
                  min={0}
                  max={100}
                  transition="ease-in-out"
                  transitionDuration={"0.2"}
                  onChange={handleSeekChange}
                  onMouseDown={onSeekMouseDown}
                  onChangeEnd={onSeekMouseUp}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg={"#f1b23bea"} />
                  </SliderTrack>
                  <SliderThumb
                    boxSize={3}
                    bg={"#f1b23bea"}
                    transition="ease-in-out"
                    transitionDuration={"0.2"}
                  />
                </Slider>

                {/* Other player controls */}
                <Flex width={"full"} alignItems={"center"} my={2} gap={10}>
                  <MdOutlineReplay10
                    fontSize={30}
                    color={"#f1f1f1"}
                    cursor="pointer"
                    onClick={handleFastRewind}
                  />
                  <Box onClick={() => setIsPlaying(!isPlaying)}>
                    {!isPlaying ? (
                      <IoPlay
                        fontSize={30}
                        color={"#f2f2f2"}
                        cursor="pointer"
                      />
                    ) : (
                      <IoPause
                        fontSize={30}
                        color={"#f2f2f2"}
                        cursor="pointer"
                      />
                    )}
                  </Box>
                  <MdForward10
                    fontSize={30}
                    color={"#f1f1f1"}
                    cursor="pointer"
                    onClick={handleFastForward}
                  />

                  {/* Volume Controls */}
                  <Flex alignItems={"center"}>
                    <Box onClick={() => setMuted(!muted)}>
                      {!muted ? (
                        <MdVolumeUp
                          fontSize={30}
                          color={"#f1f1f1"}
                          cursor="pointer"
                        />
                      ) : (
                        <MdVolumeOff
                          fontSize={30}
                          color={"#f1f1f1"}
                          cursor="pointer"
                        />
                      )}
                    </Box>
                    <Slider
                      aria-label="slider-ex-1"
                      defaultValue={volume * 100}
                      min={0}
                      max={100}
                      size="sm"
                      width={16}
                      mx={2}
                      onChangeStart={onvolumechange}
                      onChangeEnd={onvolumechange}
                    >
                      <SliderTrack>
                        <SliderFilledTrack bg={"#f1b23bea"} />
                      </SliderTrack>
                      <SliderThumb boxSize={2} bg={"#f1b23bea"} />
                    </Slider>
                  </Flex>

                  {/* Duration of video */}
                  <Flex alignItems={"center"} gap={2}>
                    <Text fontSize={16} color={"whitesmoke"}>
                      {elapsedTime}
                    </Text>
                    <Text fontSize={16} color={"whitesmoke"}>
                      /
                    </Text>
                    <Text fontSize={16} color={"whitesmoke"}>
                      {totalDuration}
                    </Text>
                  </Flex>
                  <Image src={Logo} width={"60px"} ml="auto" />
                  <MdFullscreen
                    fontSize={30}
                    color={"#f1f1f1"}
                    cursor="pointer"
                    onClick={() => {
                      screenfull.toggle(playerContainer.current)
                    }}
                  />
                </Flex>
              </Flex>
            </div>
          </div>
        </div>
        <div className="w-full col-span-1"></div>
      </div>
    </div>
  );
};

export default PinDetail;
