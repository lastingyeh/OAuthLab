#### Project structure

./js

    -APP.js (loading,loggedIn)
        
        if (loading) -> <ActivityIndicator />
        
        if (!loggedIn) -> <WebView />
        
                       -> *<LoggedIn />
                        
    *-LoggedIn.js
    
        <ApollpProvider /> (client)
        
            <NavigationProvider /> **(router)
            
                ***<Main />
            
    **router
        
        <HomeScreen />
        
        <UserScreen />
        
        <RepoScrenn />
        
     ***Main
     
        <DrawerNavigation />
        
            <DrawerNavigationItem />
            
                <StackNavigation />
                
#### install

npm install

#### get your OAuth from github 

The related refs that see http://ithelp.ithome.com.tw/m/articles/10188595

fill out 'env.js'

#### start

react-native run-ios

#### refs by

https://github.com/chentsulin/IronGithub