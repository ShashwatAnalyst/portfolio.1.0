import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useUltraSmoothScroll } from '../../hooks/UltraSmoothScroll';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SkillData {
  year: string;
  Python: number;
  PostgreSQL: number;
  Tableau: number;
  Excel: number;
  [key: string]: string | number; // Add index signature
}

const skillData: SkillData[] = [
  { year: 'Jan-2024', Python: 40, PostgreSQL: 60, Tableau: 30, Excel: 80 },
  { year: 'Aug-2024', Python: 60, PostgreSQL: 75, Tableau: 50, Excel: 85 },
  { year: 'Jan-2025', Python: 80, PostgreSQL: 85, Tableau: 70, Excel: 90 },
  { year: 'Mar-2025', Python: 90, PostgreSQL: 95, Tableau: 85, Excel: 95 },
];

const tools = [
  {
    name: 'Python',
    level: 25,
    icon: (
      <svg viewBox="-2 -2 96 105" width="50" height="50" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
        <defs>
          <linearGradient id="python-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5a9fd4" />
            <stop offset="100%" stopColor="#306998" />
          </linearGradient>
          <linearGradient id="python-yellow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd43b" />
            <stop offset="100%" stopColor="#ffe873" />
          </linearGradient>
        </defs>
        <path d="M54.92,0.001c-4.58,0.022-8.96,0.413-12.81,1.095C30.76,3.099,28.7,7.295,28.7,15.032v10.219h26.813v3.406H28.7H18.637c-7.792,0-14.616,4.684-16.75,13.594c-2.462,10.213-2.571,16.586,0,27.25c1.906,7.938,6.458,13.594,14.25,13.594h9.219v-12.25c0-8.85,7.657-16.656,16.75-16.656h26.781c7.455,0,13.406-6.138,13.406-13.625V15.032c0-7.792-6.458-13.594-14.25-13.594C70.092,0.328,59.502-0.02,54.92,0.001z" fill="url(#python-blue)" />
        <circle cx="39.325" cy="13.22" r="5.03" fill="#fff" />
        <path d="M85.638,28.657v11.906c0,9.231-7.826,17-16.75,17H42.106c-7.336,0-13.406,6.278-13.406,13.625v25.531c0,7.266,6.319,11.54,13.406,13.625c8.487,2.496,16.626,2.947,26.781,0c6.75-1.954,13.406-5.888,13.406-13.625V86.501H55.487v-3.406h26.781h13.406c7.792,0,10.696-5.435,13.406-13.594c2.799-8.399,2.68-16.476,0-27.25c-1.926-7.757-5.604-13.594-13.406-13.594z" fill="url(#python-yellow)" />
        <circle cx="70.575" cy="93.313" r="5.03" fill="#fff" />
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    level: 30,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="-4 0 264 264" preserveAspectRatio="xMinYMin meet"><path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.847 211.614.683 185.552.372c-13.903-.17-26.108 2.575-32.475 4.549-5.928-1.046-12.302-1.63-18.99-1.738-12.537-.2-23.614 2.533-33.079 8.15-5.24-1.772-13.65-4.27-23.362-5.864-22.842-3.75-41.252-.828-54.718 8.685C6.622 25.672-.937 45.684.461 73.634c.444 8.874 5.408 35.874 13.224 61.48 4.492 14.718 9.282 26.94 14.237 36.33 7.027 13.315 14.546 21.156 22.987 23.972 4.731 1.576 13.327 2.68 22.368-4.85 1.146 1.388 2.675 2.767 4.704 4.048 2.577 1.625 5.728 2.953 8.875 3.74 11.341 2.835 21.964 2.126 31.027-1.848.056 1.612.099 3.152.135 4.482.06 2.157.12 4.272.199 6.25.537 13.374 1.447 23.773 4.143 31.049.148.4.347 1.01.557 1.657 1.345 4.118 3.594 11.012 9.316 16.411 5.925 5.593 13.092 7.308 19.656 7.308 3.292 0 6.433-.432 9.188-1.022 9.82-2.105 20.973-5.311 29.041-16.799 7.628-10.86 11.336-27.217 12.007-52.99.087-.729.167-1.425.244-2.088l.16-1.362 1.797.158.463.031c10.002.456 22.232-1.665 29.743-5.154 5.935-2.754 24.954-12.795 20.476-26.351" /><path d="M237.906 160.722c-29.74 6.135-31.785-3.934-31.785-3.934 31.4-46.593 44.527-105.736 33.2-120.211-30.904-39.485-84.399-20.811-85.292-20.327l-.287.052c-5.876-1.22-12.451-1.946-19.842-2.067-13.456-.22-23.664 3.528-31.41 9.402 0 0-95.43-39.314-90.991 49.444.944 18.882 27.064 142.873 58.218 105.422 11.387-13.695 22.39-25.274 22.39-25.274 5.464 3.63 12.006 5.482 18.864 4.817l.533-.452c-.166 1.7-.09 3.363.213 5.332-8.026 8.967-5.667 10.541-21.711 13.844-16.235 3.346-6.698 9.302-.471 10.86 7.549 1.887 25.013 4.561 36.813-11.958l-.47 1.885c3.144 2.519 5.352 16.383 4.982 28.952-.37 12.568-.617 21.197 1.86 27.937 2.479 6.74 4.948 21.905 26.04 17.386 17.623-3.777 26.756-13.564 28.027-29.89.901-11.606 2.942-9.89 3.07-20.267l1.637-4.912c1.887-15.733.3-20.809 11.157-18.448l2.64.232c7.99.363 18.45-1.286 24.589-4.139 13.218-6.134 21.058-16.377 8.024-13.686h.002" fill="#336791" /><path d="M108.076 81.525c-2.68-.373-5.107-.028-6.335.902-.69.523-.904 1.129-.962 1.546-.154 1.105.62 2.327 1.096 2.957 1.346 1.784 3.312 3.01 5.258 3.28.282.04.563.058.842.058 3.245 0 6.196-2.527 6.456-4.392.325-2.336-3.066-3.893-6.355-4.35M196.86 81.599c-.256-1.831-3.514-2.353-6.606-1.923-3.088.43-6.082 1.824-5.832 3.659.2 1.427 2.777 3.863 5.827 3.863.258 0 .518-.017.78-.054 2.036-.282 3.53-1.575 4.24-2.32 1.08-1.136 1.706-2.402 1.591-3.225" fill="#FFF" /><path d="M247.802 160.025c-1.134-3.429-4.784-4.532-10.848-3.28-18.005 3.716-24.453 1.142-26.57-.417 13.995-21.32 25.508-47.092 31.719-71.137 2.942-11.39 4.567-21.968 4.7-30.59.147-9.463-1.465-16.417-4.789-20.665-13.402-17.125-33.072-26.311-56.882-26.563-16.369-.184-30.199 4.005-32.88 5.183-5.646-1.404-11.801-2.266-18.502-2.376-12.288-.199-22.91 2.743-31.704 8.74-3.82-1.422-13.692-4.811-25.765-6.756-20.872-3.36-37.458-.814-49.294 7.571-14.123 10.006-20.643 27.892-19.38 53.16.425 8.501 5.269 34.653 12.913 59.698 10.062 32.964 21 51.625 32.508 55.464 1.347.449 2.9.763 4.613.763 4.198 0 9.345-1.892 14.7-8.33a529.832 529.832 0 0 1 20.261-22.926c4.524 2.428 9.494 3.784 14.577 3.92.01.133.023.266.035.398a117.66 117.66 0 0 0-2.57 3.175c-3.522 4.471-4.255 5.402-15.592 7.736-3.225.666-11.79 2.431-11.916 8.435-.136 6.56 10.125 9.315 11.294 9.607 4.074 1.02 7.999 1.523 11.742 1.523 9.103 0 17.114-2.992 23.516-8.781-.197 23.386.778 46.43 3.586 53.451 2.3 5.748 7.918 19.795 25.664 19.794 2.604 0 5.47-.303 8.623-.979 18.521-3.97 26.564-12.156 29.675-30.203 1.665-9.645 4.522-32.676 5.866-45.03 2.836.885 6.487 1.29 10.434 1.289 8.232 0 17.731-1.749 23.688-4.514 6.692-3.108 18.768-10.734 16.578-17.36zm-44.106-83.48c-.061 3.647-.563 6.958-1.095 10.414-.573 3.717-1.165 7.56-1.314 12.225-.147 4.54.42 9.26.968 13.825 1.108 9.22 2.245 18.712-2.156 28.078a36.508 36.508 0 0 1-1.95-4.009c-.547-1.326-1.735-3.456-3.38-6.404-6.399-11.476-21.384-38.35-13.713-49.316 2.285-3.264 8.084-6.62 22.64-4.813zm-17.644-61.787c21.334.471 38.21 8.452 50.158 23.72 9.164 11.711-.927 64.998-30.14 110.969a171.33 171.33 0 0 0-.886-1.117l-.37-.462c7.549-12.467 6.073-24.802 4.759-35.738-.54-4.488-1.05-8.727-.92-12.709.134-4.22.692-7.84 1.232-11.34.663-4.313 1.338-8.776 1.152-14.037.139-.552.195-1.204.122-1.978-.475-5.045-6.235-20.144-17.975-33.81-6.422-7.475-15.787-15.84-28.574-21.482 5.5-1.14 13.021-2.203 21.442-2.016zM66.674 175.778c-5.9 7.094-9.974 5.734-11.314 5.288-8.73-2.912-18.86-21.364-27.791-50.624-7.728-25.318-12.244-50.777-12.602-57.916-1.128-22.578 4.345-38.313 16.268-46.769 19.404-13.76 51.306-5.524 64.125-1.347-.184.182-.376.352-.558.537-21.036 21.244-20.537 57.54-20.485 59.759-.002.856.07 2.068.168 3.735.362 6.105 1.036 17.467-.764 30.334-1.672 11.957 2.014 23.66 10.111 32.109a36.275 36.275 0 0 0 2.617 2.468c-3.604 3.86-11.437 12.396-19.775 22.426zm22.479-29.993c-6.526-6.81-9.49-16.282-8.133-25.99 1.9-13.592 1.199-25.43.822-31.79-.053-.89-.1-1.67-.127-2.285 3.073-2.725 17.314-10.355 27.47-8.028 4.634 1.061 7.458 4.217 8.632 9.645 6.076 28.103.804 39.816-3.432 49.229-.873 1.939-1.698 3.772-2.402 5.668l-.546 1.466c-1.382 3.706-2.668 7.152-3.465 10.424-6.938-.02-13.687-2.984-18.819-8.34zm1.065 37.9c-2.026-.506-3.848-1.385-4.917-2.114.893-.42 2.482-.992 5.238-1.56 13.337-2.745 15.397-4.683 19.895-10.394 1.031-1.31 2.2-2.794 3.819-4.602l.002-.002c2.411-2.7 3.514-2.242 5.514-1.412 1.621.67 3.2 2.702 3.84 4.938.303 1.056.643 3.06-.47 4.62-9.396 13.156-23.088 12.987-32.921 10.526zm69.799 64.952c-16.316 3.496-22.093-4.829-25.9-14.346-2.457-6.144-3.665-33.85-2.808-64.447.011-.407-.047-.8-.159-1.17a15.444 15.444 0 0 0-.456-2.162c-1.274-4.452-4.379-8.176-8.104-9.72-1.48-.613-4.196-1.738-7.46-.903.696-2.868 1.903-6.107 3.212-9.614l.549-1.475c.618-1.663 1.394-3.386 2.214-5.21 4.433-9.848 10.504-23.337 3.915-53.81-2.468-11.414-10.71-16.988-23.204-15.693-7.49.775-14.343 3.797-17.761 5.53-.735.372-1.407.732-2.035 1.082.954-11.5 4.558-32.992 18.04-46.59 8.489-8.56 19.794-12.788 33.568-12.56 27.14.444 44.544 14.372 54.366 25.979 8.464 10.001 13.047 20.076 14.876 25.51-13.755-1.399-23.11 1.316-27.852 8.096-10.317 14.748 5.644 43.372 13.315 57.129 1.407 2.521 2.621 4.7 3.003 5.626 2.498 6.054 5.732 10.096 8.093 13.046.724.904 1.426 1.781 1.96 2.547-4.166 1.201-11.649 3.976-10.967 17.847-.55 6.96-4.461 39.546-6.448 51.059-2.623 15.21-8.22 20.875-23.957 24.25zm68.104-77.936c-4.26 1.977-11.389 3.46-18.161 3.779-7.48.35-11.288-.838-12.184-1.569-.42-8.644 2.797-9.547 6.202-10.503.535-.15 1.057-.297 1.561-.473.313.255.656.508 1.032.756 6.012 3.968 16.735 4.396 31.874 1.271l.166-.033c-2.042 1.909-5.536 4.471-10.49 6.772z" fill="#FFF" /></svg>
    )
  },
  {
    name: 'Tableau',
    level: 20,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 -2.5 256 256" version="1.1" preserveAspectRatio="xMidYMid">
        <g>
          <polygon fill="#7099A6" points="123.929417 11.5932444 123.929417 23.2338083 103.108897 23.2338083 103.108897 30.8049067 123.929417 30.8049067 123.929417 53.9913956 132.068348 53.9913956 132.068348 30.8049067 153.409382 30.8049067 153.409382 23.2338083 132.068348 23.2338083 132.068348 0 123.929417 0">
          </polygon>
          <polygon fill="#EB912C" points="55.8841702 41.1205283 55.8841702 58.0135416 24.369473 58.0135416 24.369473 68.6130794 55.8841702 68.6130794 55.8841702 102.919619 67.5720533 102.919619 67.5720533 68.6130794 99.5599441 68.6130794 99.5599441 58.0135416 67.5720533 58.0135416 67.5720533 24.2275149 55.8841702 24.2275149">
          </polygon>
          <polygon fill="#59879B" points="187.952518 41.1205283 187.952518 58.0135416 156.437821 58.0135416 156.437821 69.1335924 187.952518 69.1335924 187.952518 102.919619 200.113595 102.919619 200.113595 69.1335924 231.628292 69.1335924 231.628292 58.0135416 200.113595 58.0135416 200.113595 24.2275149 187.952518 24.2275149">
          </polygon>
          <polygon fill="#E8762C" points="120.900978 98.6608762 120.900978 117.588622 85.8373283 117.588622 85.8373283 131.689793 120.900978 131.689793 120.900978 169.545285 135.096787 169.545285 135.096787 131.689793 170.160437 131.689793 170.160437 117.588622 135.096787 117.588622 135.096787 79.7331302 120.900978 79.7331302">
          </polygon>
          <polygon fill="#5B6591" points="224.009874 108.219388 224.009874 120.096549 202.668841 120.096549 202.668841 129.70238 224.009874 129.70238 224.009874 153.409382 234.656731 153.409382 234.656731 129.70238 255.997765 129.70238 255.997765 120.096549 234.656731 120.096549 234.656731 96.3895467 224.009874 96.3895467">
          </polygon>
          <polygon fill="#7099A6" points="20.8205206 109.260414 20.8205206 120.617062 0 120.617062 0 128.661354 20.8205206 128.661354 20.8205206 151.374649 28.9594514 151.374649 28.9594514 128.661354 50.3004851 127.904244 50.3004851 120.617062 28.9594514 120.617062 28.9594514 97.9037663 20.8205206 97.9037663">
          </polygon>
          <polygon fill="#C72035" points="55.8841702 162.731297 55.8841702 179.62431 24.369473 179.62431 24.369473 190.744361 55.8841702 190.744361 55.8841702 224.530387 68.045247 224.530387 68.045247 190.744361 99.5599441 190.744361 99.5599441 179.62431 68.045247 179.62431 68.045247 145.838283 55.8841702 145.838283">
          </polygon>
          <polygon fill="#1F447E" points="187.952518 162.731297 187.952518 179.62431 156.437821 179.62431 156.437821 190.223848 187.952518 190.223848 187.952518 224.530387 200.113595 224.530387 200.113595 190.223848 231.628292 190.223848 231.628292 179.62431 200.113595 179.62431 200.113595 145.838283 187.952518 145.838283">
          </polygon>
          <polygon fill="#5B6591" points="122.93571 205.649961 122.93571 217.479802 101.594677 217.479802 101.594677 227.085633 122.93571 227.085633 122.93571 250.792635 133.582568 250.792635 133.582568 227.085633 154.923601 227.085633 154.923601 217.479802 133.582568 217.479802 133.582568 193.7728 122.93571 193.7728">
          </polygon>
        </g>
      </svg>
    )
  },
  {
    name: 'Excel',
    level: 25,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32" fill="none" className="overflow-visible">
        <rect x="8" y="2" width="24" height="28" rx="2" fill="#2FB776" />
        <path d="M8 23H32V28C32 29.1046 31.1046 30 30 30H10C8.89543 30 8 29.1046 8 28V23Z" fill="url(#paint0_linear_87_7712)" />
        <rect x="20" y="16" width="12" height="7" fill="#229C5B" />
        <rect x="20" y="9" width="12" height="7" fill="#27AE68" />
        <path d="M8 4C8 2.89543 8.89543 2 10 2H20V9H8V4Z" fill="#1D854F" />
        <rect x="8" y="9" width="12" height="7" fill="#197B43" />
        <rect x="8" y="16" width="12" height="7" fill="#1B5B38" />
        <path d="M8 12C8 10.3431 9.34315 9 11 9H17C18.6569 9 20 10.3431 20 12V24C20 25.6569 18.6569 27 17 27H8V12Z" fill="#000000" fillOpacity="0.3" />
        <rect y="7" width="18" height="18" rx="2" fill="url(#paint1_linear_87_7712)" />
        <path d="M13 21L10.1821 15.9L12.8763 11H10.677L9.01375 14.1286L7.37801 11H5.10997L7.81787 15.9L5 21H7.19931L8.97251 17.6857L10.732 21H13Z" fill="white" />
        <defs>
          <linearGradient id="paint0_linear_87_7712" x1="8" y1="26.5" x2="32" y2="26.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#163C27" />
            <stop offset="1" stopColor="#2A6043" />
          </linearGradient>
          <linearGradient id="paint1_linear_87_7712" x1="0" y1="16" x2="18" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#185A30" />
            <stop offset="1" stopColor="#176F3D" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
];

// Add useWindowSize hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function SkillsSection() {
  const { addSection } = useUltraSmoothScroll();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const { width } = useWindowSize();
  const isSmallScreen = width < 460;

  const handleSkillClick = (skillName: string) => {
    setSelectedSkill(skillName === selectedSkill ? null : skillName);
  };

  const getSkillColor = (skillName: string) => {
    switch (skillName) {
      case 'Python':
        return '#F59E0B';
      case 'PostgreSQL':
        return '#3B82F6';
      case 'Tableau':
        return '#EF4444';
      case 'Excel':
        return '#10B981';
      default:
        return '#94A3B8';
    }
  };

  // Get the current data source based on selected year or default to latest
  const getCurrentDataSource = () => {
    if (selectedYear) {
      return skillData.find(data => data.year === selectedYear) || skillData[skillData.length - 1];
    }
    return skillData[skillData.length - 1];
  };

  // Filter skill data for line chart
  const filteredSkillData = skillData.map(year => {
    if (!selectedSkill) return year;
    return {
      year: year.year,
      [selectedSkill]: year[selectedSkill]
    };
  });

  // Fix arithmetic operations
  const remainingValue = (skillValue: number | string): number => {
    const numericValue = typeof skillValue === 'number' ? skillValue : 0;
    return 100 - numericValue;
  };

  // Update the pie chart data calculations
  const pieChartData = selectedYear
    ? (() => {
      const yearData = skillData.find(year => year.year === selectedYear);
      if (!yearData) return [];

      if (selectedSkill) {
        const rawValue = yearData[selectedSkill as keyof typeof yearData];
        const skillValue = typeof rawValue === 'number' ? rawValue : 0;
        return [
          {
            name: selectedSkill,
            value: skillValue,
            contribution: skillValue,
            color: getSkillColor(selectedSkill)
          },
          {
            name: 'Remaining',
            value: remainingValue(skillValue),
            contribution: 0,
            color: 'hsl(var(--muted))'
          }
        ];
      }
      // Calculate total for the selected year
      const skillEntries = Object.entries(yearData).filter(([key]) => key !== 'year');
      const total = skillEntries.reduce((sum, [, value]) => sum + (value as number), 0);

      // Calculate percentage contribution for each skill
      return skillEntries.map(([skill, value]) => {
        const percentage = Math.round(((value as number) / total) * 100);
        return {
          name: skill,
          value: percentage,
          contribution: percentage,
          color: getSkillColor(skill)
        };
      });
    })()
    : selectedSkill
      ? (() => {
        // Use current data source (respects selected year if available)
        const currentData = getCurrentDataSource();
        const skillValue = currentData[selectedSkill as keyof typeof currentData] || 0;
        return [
          {
            name: selectedSkill,
            value: skillValue,
            contribution: skillValue,
            color: getSkillColor(selectedSkill)
          },
          {
            name: 'Remaining',
            value: remainingValue(skillValue),
            contribution: 0,
            color: 'hsl(var(--muted))'
          }
        ];
      })()
      : (() => {
        // Default view - show proficiency levels as percentages from current data source
        const currentData = getCurrentDataSource();
        const skillEntries = Object.entries(currentData).filter(([key]) => key !== 'year');
        const total = skillEntries.reduce((sum, [, value]) => sum + (value as number), 0);

        return skillEntries.map(([skill, value]) => {
          const percentage = Math.round(((value as number) / total) * 100);
          return {
            name: skill,
            value: percentage,
            contribution: percentage,
            color: getSkillColor(skill)
          };
        });
      })();

  // Get descriptive text based on current selections
  const getDescriptiveText = () => {
    const currentData = getCurrentDataSource();

    if (selectedYear && selectedSkill) {
      const skillValue = currentData[selectedSkill as keyof typeof currentData] || 0;
      return `${selectedSkill}: ${skillValue}% proficiency in ${selectedYear}`;
    } else if (selectedYear) {
      return `Showing skill percentage contribution for ${selectedYear}. Click on a skill segment or the skill icons below to view the proficiency of that skill in ${selectedYear}`;
    } else if (selectedSkill) {
      const skillValue = currentData[selectedSkill as keyof typeof currentData] || 0;
      return `Currently showing ${selectedSkill} proficiency level: ${skillValue}%. Select a timeline to see how this skill proficiency has evolved over time.`;
    } else {
      return `Showing percentage contribution of each skill based on the latest data. Click on a skill or time period to see detailed breakdowns.`;
    }
  };

  return (
    <section ref={addSection} id="skills" className="flex items-center justify-center py-16">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`${isSmallScreen ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} heading-font font-normal mb-4`}>TECHNICAL SKILLS PROGRESS STATS</h2>
          <p className={`${isSmallScreen ? 'text-xs md:text-sm' : 'text-lg'} text-muted-foreground ${isSmallScreen ? 'text-[12px]' : 'text-[18.5px]'} max-w-2xl mx-auto`}>
            A comprehensive overview of my technical skills and their evolution over time
          </p>
          <p className={`${isSmallScreen ? 'text-xs' : 'text-lg'} text-muted-foreground mt-2 max-w-2xl mx-auto`}>
            (Skill proficiency and contribution percentage are measures of my hands-on experience and project work with each technology)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className={`hover:shadow-lg transition-all duration-300 ${isSmallScreen ? 'p-3' : ''}`}>
            <CardHeader className={`pb-6`}>
              <CardTitle className={`flex items-center gap-2 heading-font ${isSmallScreen ? 'text-sm font-[60]' : 'text-[25px] font-[60]'} tracking-wider text-black dark:text-foreground/80`}>
                SKILLS GROWTH OVER TIME (SELECT TIMELINE)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 350}>
                <LineChart
                  data={filteredSkillData}
                  margin={{
                    top: 30,
                    right: isSmallScreen ? 15 : 30,
                    left: isSmallScreen ? 10 : 20,
                    bottom: 20
                  }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload[0]) {
                      const year = e.activePayload[0].payload.year;
                      setSelectedYear(year);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="year"
                    label={{ value: "Date", position: "insideBottom", offset: -10, fontSize: isSmallScreen ? 8 : 12 }}
                    tick={{
                      fontSize: isSmallScreen ? 8 : 12,
                      dy: isSmallScreen ? 10 : 0
                    }}
                    height={isSmallScreen ? 40 : 30}
                    interval={0}
                  />
                  <YAxis
                    label={{ value: "Proficiency", angle: -90, position: "insideLeft", fontSize: isSmallScreen ? 8 : 12 }}
                    domain={[0, 100]}
                    tick={{
                      fontSize: isSmallScreen ? 8 : 12
                    }}
                    width={isSmallScreen ? 35 : 40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: isSmallScreen ? '10px' : '14px'
                    }}
                  />
                  <Legend verticalAlign="top" wrapperStyle={{ fontSize: isSmallScreen ? '10px' : '14px', position: 'absolute', top: 10 }} />
                  {selectedSkill ? (
                    <Line
                      type="monotone"
                      dataKey={selectedSkill}
                      stroke={getSkillColor(selectedSkill)}
                      strokeWidth={isSmallScreen ? 2 : 4}
                      dot={{
                        fill: getSkillColor(selectedSkill),
                        strokeWidth: isSmallScreen ? 1 : 3,
                        r: isSmallScreen ? 3 : 6,
                        onClick: (e: any) => {
                          if (e && e.payload) {
                            setSelectedYear(e.payload.year);
                          }
                        }
                      }}
                      activeDot={{ r: isSmallScreen ? 4 : 8 }}
                    />
                  ) : (
                    ['Python', 'PostgreSQL', 'Tableau', 'Excel'].map((skill) => (
                      <Line
                        key={skill}
                        type="monotone"
                        dataKey={skill}
                        stroke={getSkillColor(skill)}
                        strokeWidth={isSmallScreen ? 1 : 2}
                        strokeDasharray="5 5"
                        dot={{
                          fill: getSkillColor(skill),
                          strokeWidth: isSmallScreen ? 1 : 2,
                          r: isSmallScreen ? 2 : 4,
                          onClick: (e: any) => {
                            if (e && e.payload) {
                              setSelectedYear(e.payload.year);
                            }
                          }
                        }}
                        activeDot={{ r: isSmallScreen ? 3 : 6 }}
                      />
                    ))
                  )}
                </LineChart>
              </ResponsiveContainer>
              <div className={`mt-4 ${isSmallScreen ? 'text-xs' : 'text-lg'} text-black dark:text-muted-foreground text-center ${isSmallScreen ? 'text-[10px]' : 'text-[18.5px]'}`}>
                {selectedYear
                  ? `Showing skills proficiency growth data over time. Timeline: ${selectedYear}. Click on skill icons below or donut chart segments to focus on specific skills.`
                  : selectedSkill
                    ? `Showing ${selectedSkill} progression over time. Click on any point in the timeline to view skill distribution for that period.`
                    : `Click on any point in the timeline to view skill distribution for that period, or select a specific skill to track its progression.`}
              </div>
            </CardContent>
          </Card>

          <Card className={`hover:shadow-lg transition-all duration-300 ${isSmallScreen ? 'p-3' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`heading-font ${isSmallScreen ? 'text-sm font-[60]' : 'text-[25px] font-[60]'} tracking-wider text-black dark:text-foreground/80`}>
                SKILL CONTRIBUTION & PROFICIENCY LEVELS
              </CardTitle>
              <Select
                value={selectedYear || ''}
                onValueChange={(value) => {
                  setSelectedYear(value);
                  // Don't clear selectedSkill - maintain skill selection when switching timelines
                }}
              >
                <SelectTrigger className={`${isSmallScreen ? 'w-[120px] text-xs' : 'w-[180px]'}`}>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={8} className="bg-background/95 backdrop-blur-sm">
                  {skillData.map((data) => (
                    <SelectItem key={data.year} value={data.year}>
                      {data.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300}>
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (isSmallScreen) {
                        return null;
                      }
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        if (data.name === 'Remaining') {
                          return null;
                        }
                        return (
                          <div className="bg-background border rounded-md p-2 shadow-lg text-xs">
                            <p className="font-bold">{data.name}</p>
                            {selectedSkill ? (
                              <p>Proficiency: {data.value}%</p>
                            ) : (
                              <p>Contribution: {data.value}%</p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={isSmallScreen ? 45 : 80}
                    innerRadius={isSmallScreen ? 22 : 40}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, contribution, cx, cy, midAngle }) => {
                      if (name === 'Remaining') return null;

                      const RADIAN = Math.PI / 180;
                      const radius = isSmallScreen ? 55 : 90;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill={getSkillColor(name)}
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize={isSmallScreen ? 7 : 12}
                          fontWeight="medium"
                        >
                          {`${name}: ${contribution}%`}
                        </text>
                      );
                    }}
                    animationDuration={300}
                    animationBegin={0}
                    stroke="none"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color || getSkillColor(entry.name)}
                        opacity={entry.name === 'Remaining' ? 0.3 : 1}
                        className="transition-all duration-300 hover:scale-110"
                        style={{
                          transformOrigin: 'center',
                          cursor: entry.name === 'Remaining' ? 'default' : 'pointer',
                          stroke: 'none'
                        }}
                        onClick={() => entry.name !== 'Remaining' && handleSkillClick(entry.name)}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className={`mt-4 ${isSmallScreen ? 'text-xs' : 'text-lg'} text-black dark:text-muted-foreground text-center ${isSmallScreen ? 'text-[10px]' : 'text-[18.5px]'}`}>
                {getDescriptiveText()}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setSelectedSkill(null)}
                  disabled={!selectedSkill}
                  className={`${isSmallScreen ? 'px-3 py-1 text-xs' : 'px-4 py-2'} font-medium transition-all duration-300 border-0
                    ${selectedSkill
                      ? 'bg-blue-600 text-white hover:bg-primary hover:text-primary-foreground'
                      : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                    }`}
                >
                  {selectedSkill ? 'Back to Skill Contribution View' : 'No Skill is Selected'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className={`bg-gradient-to-br from-background to-muted/20 ${isSmallScreen ? 'p-3' : ''}`}>
          <CardHeader>
            <CardTitle className={`text-center heading-font ${isSmallScreen ? 'text-sm font-[60]' : 'text-[25px] font-[60]'} tracking-wider text-black dark:text-foreground/80`}>TECHNICAL PROFICIENCY (SELECT SKILL)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex flex-wrap gap-8 justify-center ${isSmallScreen ? 'gap-4' : ''}`}>
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-300 ${selectedSkill === tool.name ? 'scale-110' : 'hover:scale-110'}`}
                  onClick={() => handleSkillClick(tool.name)}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`${isSmallScreen ? 'w-12 h-12' : 'w-16 h-16'} flex items-center justify-center transition-transform duration-300 transform-gpu origin-center ${selectedSkill === tool.name ? 'scale-125' : 'group-hover:scale-125'}`}>
                      {React.cloneElement(tool.icon, {
                        width: isSmallScreen ? 30 : 50,
                        height: isSmallScreen ? 30 : 50
                      })}
                    </div>
                    <span className={`${isSmallScreen ? 'text-xs' : 'text-sm'} font-medium transition-colors ${selectedSkill === tool.name ? 'text-primary' : 'group-hover:text-primary'}`}>{tool.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}