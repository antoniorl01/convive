import { useState } from "react";
import { StyleProp, View, ViewStyle, Text, PanResponder, PanResponderInstance } from "react-native";
import * as d3 from "d3";
import { Defs, Line, LinearGradient, Path, Stop, Svg } from "react-native-svg";
import { defaultStyles } from "@/constants/Styles";

export type LineGraphProps = {
  data: number[];
  colorStoke: string;
  colorGradient: string;
  label: string;
  style?: StyleProp<ViewStyle>;
};

const GRAPH_ASPECT_RATIO = 9 / 16;

export function LineGraph(props: LineGraphProps) {
  const [stat, setStat] = useState<number[] | number>(props.data.slice(-1));
  const [width, setWidth] = useState(0);
  const [fingerX, setFingerX] = useState<number | null>(null);
  const height = width * GRAPH_ASPECT_RATIO;

  const graphHeight = (height * 2) / 3;

  const min = Math.min(...props.data);
  const max = Math.max(...props.data);

  const yScale = d3.scaleLinear().domain([min, max]).range([graphHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([0, props.data.length - 1])
    .range([0, width]);

  const lineFn = d3
    .line<number>()
    .x((d, ix) => xScale(ix))
    .y((d, ix) => yScale(d));

  const areaFn = d3
    .area<number>()
    .x((d, ix) => xScale(ix))
    .y0(height)
    .y1((d, ix) => yScale(d));

  const svgLine = lineFn(props.data);
  const svgArea = areaFn(props.data);

  const hexColorStroke = props.colorStoke;
  const hexColorGradient = props.colorGradient;

  const panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const { moveX } = gestureState;
      setFingerX(moveX);
      const index = Math.floor(xScale.invert(moveX));
      const value = props.data[index];
      setStat(value); 
    },
    onPanResponderRelease: () => {
      setStat(props.data.slice(-1)); 
      setFingerX(null); 
    },
  });
  

  return (
    <View
      style={[props.style]}
      onLayout={(ev) => {
        setWidth(ev.nativeEvent.layout.width);
      }}
    >
      <View style={{ height: height - graphHeight }} />
      <View style={{ padding: 4 }}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={[defaultStyles.h4]}>
          {props.label}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[{ fontSize: 34, fontWeight: "300" }]}
        >
          {stat}ºC
        </Text>
      </View>
      <Svg
        width={width}
        height={height}
        {...panResponder.panHandlers} 
      >
        {fingerX !== null && (
          <Line
            x1={fingerX!}
            y1={0}
            x2={fingerX!}
            y2={height}
            stroke={props.colorStoke}
            strokeWidth={2}
          />
        )}
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset={"0%"} stopColor={hexColorGradient} stopOpacity={1} />
            <Stop
              offset={"100%"}
              stopColor={hexColorGradient}
              stopOpacity={0}
            />
          </LinearGradient>
        </Defs>
        <Path
          d={svgLine!}
          stroke={hexColorStroke}
          fill={"none"}
          strokeWidth={4}
        />
        <Path d={svgArea!} stroke={"none"} fill={"url(#gradient)"} />
      </Svg>
    </View>
  );
}

export default LineGraph;
