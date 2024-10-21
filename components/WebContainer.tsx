const [refreshing, setRefreshing] = useState(false);
const [refresherEnabled, setEnableRefresher] = useState(true);


  //Code to get scroll position
  const handleScroll = (event) =>  {
    console.log(Number(event.nativeEvent.contentOffset.y))
    const yOffset = Number(event.nativeEvent.contentOffset.y)
    if (yOffset === 0){
      console.log('top of the page')
      setEnableRefresher(true)
    }else if(refresherEnabled){
      setEnableRefresher(false)
    }
  }
    
return (
    <SafeAreaView style={genericStyles.containerWebView}>
      <StatusBar backgroundColor={genericStyles.colors.BlueBg} barStyle={'light-content'} />
      <ScrollView style={genericStyles.scrollView} 
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing}
          enabled={refresherEnabled}
          onRefresh={()=>{
            webViewRef.current.reload()
            setRefreshing(true);
        }}
        />
      }>
        <WebView
          source={{ uri: "your url" }}
          ref={webViewRef}
          originWhitelist={['*']}
          allowsInlineMediaPlayback
          javaScriptEnabled
          scalesPageToFit
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabledAndroid
          useWebkit
          startInLoadingState={true}
          cacheEnabled
          onScroll={handleScroll}
          onLoadEnd={setRefreshing(false)}
        />
      </ScrollView>
    </SafeAreaView>
  )