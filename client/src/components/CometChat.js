const CometChat = () => {
  const appID = "225794d776f6bb61";
  const region = "us";
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
    },
    (error) => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );
  let authKey = "99464bfd6665f768d342f6ebcd6cbe0788b7008a";
  var uid = "user1";
  var name = "Kevin";

  var user = new CometChat.User(uid);
  user.setName(name);
  CometChat.createUser(user, authKey).then(
    (user) => {
      console.log("user created", user);
    },
    (error) => {
      console.log("error", error);
    }
  );

  return <div></div>;
};
