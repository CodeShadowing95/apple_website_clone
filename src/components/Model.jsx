import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { orientationImg, yellowImg } from "../utils";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animation";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  // Camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // Models
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // Rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <div className="absolute top-8 left-[10px] bg-gray-300/50 p-4 rounded-xl z-10">
              <div className="flex-center gap-4">
                <img
                  src={orientationImg}
                  alt="orientation"
                  width={24}
                  height={24}
                />
                <p className="text-base font-semibold hidden md:block">
                  Rotate the phone to appreciate each side.
                </p>
              </div>
            </div>

            <div className="absolute lg:flex hidden bottom-14 right-[10px] bg-gray-300 p-4 rounded-xl z-10">
              <div className="mx-auto w-full">
                <p className="text-sm font-light text-center mb-5">
                  {model.title}
                </p>
                <div className="flex-center">
                  <ul className="color-container">
                    {models.map((item, i) => (
                      <li
                        key={i}
                        className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                        style={{ backgroundColor: item.color[0] }}
                        onClick={() => setModel(item)}
                      />
                    ))}
                  </ul>

                  {/* For managing the device size */}
                  <button className="size-btn-container">
                    {sizes.map(({ label, value }) => (
                      <span
                        key={label}
                        className="size-btn"
                        style={{
                          backgroundColor:
                            size === value ? "white" : "transparent",
                          color: size === value ? "black" : "white",
                        }}
                        onClick={() => setSize(value)}
                      >
                        {label}
                      </span>
                    ))}
                  </button>
                </div>
              </div>
            </div>

            {/* Area to display all small devices */}
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            {/* Area to display all large devices */}
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            {/* Area to display the 3D model device */}
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          {/* Area to display device title and color selector */}
          <div className="mx-auto w-full lg:hidden flex flex-col">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              {/* For managing the device size */}
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;