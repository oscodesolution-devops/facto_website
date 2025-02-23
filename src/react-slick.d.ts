// src/react-slick.d.ts
declare module "react-slick" {
  import { Component } from "react";

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    beforeChange?: (current: number, next: number) => void;
    nextArrow?: JSX.Element;
    prevArrow?: JSX.Element;
    [key: string]: any; // Allow additional properties
  }

  export default class Slider extends Component<Settings> {}
}
