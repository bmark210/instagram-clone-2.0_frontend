// import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
// import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
// import { ReactComponent as LogoSmallIcon } from "../../assets/icons/logo-small.svg";
// import { ReactComponent as MoreIcon } from "../../assets/icons/more.svg";
// import { ReactComponent as ExploreActiveIcon } from "../../assets/icons/explore-active.svg";
// import { ReactComponent as ExploreIcon } from "../../assets/icons/explore.svg";
// import { ReactComponent as HomeActiveIcon } from "../../assets/icons/home-active.svg";

// export type IconName =
//   | "logo"
//   | "logo-small"
//   | "more"
//   | "explore-active"
//   | "explore"
//   | "home-active"
//   | "home"
//   | "messages-active"
//   | "messages"
//   | "notifications";

// type IconProps = {
//   name: IconName;
//   color: string;
//   size?: any;
//   width?: number;
//   height?: number;
// };
// const Icon = ({ name, ...props }: IconProps) => {
//   const iconPath = (`./assets/${name}.svg`);
//   return (
//     <svg
//       aria-label={name}
//       color={props.color}
//       fill={props.color}
//       height={props.size}
//       role="img"
//       viewBox="0 0 24 24"
//       width={props.size}
//     >
//       <path d={iconPath} />
//     </svg>
//   );
// };

// export default Icon;

// // export function Icon({ name, ...props }: IconProps) {
// //   const Comp = React.useMemo(() => {
// //     const imp = icons(`./${name}.svg`);
// //     if (!imp) {
// //       throw new Error(
// //         `Icon not found: ${name}. Options: ${icons.keys().join(", ")}}`
// //       );
// //     }
// //     return imp.default;
// //   }, [name]);
// //   return <Comp {...props} color={props.fill} />;
// // }
