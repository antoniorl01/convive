import { defaultStyles } from "@/constants/Styles";
import { useSession } from "@/context/SessionContext";
import { View, Text, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { Fragment, useEffect, useState } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const Page = () => {
  const { signIn } = useSession();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      verifyCode();
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      console.log("verifying code");
      signIn();
      // if signin successful -> router.replace("/home")
      router.replace("/home");
    } catch (error) {
      console.log("There was an error: ", error);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <View style={[defaultStyles.sectionHeader, { gap: 10 }]}>
        <Text style={defaultStyles.header}>Code Validation</Text>
        <Text style={defaultStyles.h4}>A 6-Digit Code was sent to: {email}{"\n"}</Text>
      </View>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />
      <Text style={[defaultStyles.textLink, { alignSelf: "flex-end" }]}>
        Don't have a code? Press here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.dark.background,
    padding: 10,
    height: 60,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default Page;
