import { Drawer } from "react-native-paper";
import { useAuth } from "../auth/AuthContext";
import { useLocale } from "../i8n/TranslationContext";
import { SafeAreaView } from "react-native-safe-area-context";

//make mobile friendly, use linkto on navigation

export function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();
  const { useTranslate } = useLocale();
  //replicate below
  //<DrawerItemList {...props} />

  return (
    <SafeAreaView>
      <Drawer.Section>
        <CustomDrawerItemList {...props} />
        <Drawer.Item
          label={useTranslate("SignOut")}
          onPress={() => signOut()}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}

const CustomDrawerItemList = ({ state, navigation, descriptors }: any) => {
  const { useTranslate } = useLocale();
  return state.routes.map((route: any, key: any) => {
    return (
      <Drawer.Item
        key={route.key}
        label={useTranslate(route.name)}
        onPress={() => navigation.navigate(route.name)}
      />
    );
  });
};
