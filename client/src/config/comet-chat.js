import { CometChat } from "@cometchat-pro/chat";

export const cometInit = () => {
  let appID = "228331214bce899a";
  let region = "us";
  let appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .autoEstablishSocketConnection(true)
    .build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
    },
    (error) => {
      console.log("Initialization failed with error:", error);
    }
  );
};

export const cometChatLogin = async (user) => {
  const UID = user.uid;
  let authKey = "aa4d09175624cdad2691e12a9c4658afafa4fcdb";

  CometChat.getLoggedinUser().then(
    (user) => {
      if (!user) {
        CometChat.login(UID, authKey).then(
          (user) => {
            console.log("Login Successful:", { user });
          },
          (error) => {
            console.log("Login failed with exception:", { error });
          }
        );
      }
    },
    (error) => {
      console.log("Some Error Occured", { error });
    }
  );
};

export const cometChatSignup = async (user) => {
  let authKey = "aa4d09175624cdad2691e12a9c4658afafa4fcdb";

  var UID = user.uid;
  var name = user.displayName;

  var cuser = new CometChat.User(UID);

  cuser.setName(name);

  await CometChat.createUser(cuser, authKey)
    .then(
      (user) => {
        console.log("user created", user);
      },
      (error) => {
        console.log("error", error);
      }
    )
    .then(
      CometChat.login(UID, authKey).then(
        (user) => {
          console.log("Login Successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      )
    );
};
