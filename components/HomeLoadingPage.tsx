import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';

//import CustomTabBar from './CustomTabBar';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingPlaceholder from './LoadingPlaceholder';
import React from 'react';

const { width } = Dimensions.get('window');

const HomeLoadingPage: React.FC = () => {
    return (
        <FlatList data={[{}]}
            renderItem={() => <>
                <LinearGradient colors={['#f0f0f0', '#e0e0e0']} style={styles.gradient}>
                    {/* <View style={styles.contentContainer}>

                        <View style={styles.topRow}>
                            <View>
                                <LoadingPlaceholder height={15} width={136} borderRadius={2} />
                                <View style={styles.gapSmall} />
                                <LoadingPlaceholder height={15} width={94} borderRadius={2} />
                            </View>
                            <LoadingPlaceholder height={40} width={40} shape="circle" />
                        </View>


                        <LoadingPlaceholder height={54} width={327} borderRadius={7} />
                        <View style={styles.gapLarge} />
                        <LoadingPlaceholder height={136.56} width={width} borderRadius={21.27} />
                        <View style={styles.gapSmall} />


                        <View style={styles.row}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <LoadingPlaceholder
                                    key={index}
                                    height={104.28}
                                    width={104.27}
                                    borderRadius={21.27}
                                />
                            ))}
                        </View>

                        <View style={styles.gapLarge} />
                    </View> */}

                    {/* Horizontal List */}
                    {/* <FlatList
                        data={[...Array(5).keys()]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={() => (
                            <LoadingPlaceholder height={40} width={97} borderRadius={50} />
                        )}
                        ItemSeparatorComponent={() => <View style={styles.gapSmallHorizontal} />}
                        keyExtractor={(item) => item.toString()}
                        contentContainerStyle={styles.horizontalList}
                    />
 */}
                    {/* Grid List */}
                    {/* <FlatList
                        data={[...Array(4).keys()]}
                        numColumns={2}
                        renderItem={() => (
                            <LoadingPlaceholder width={156} height={209} borderRadius={6} style={styles.gridItem} />
                        )}
                        keyExtractor={(item) => item.toString()}
                        columnWrapperStyle={styles.gridColumnWrapper}
                    /> */}

                    {/* Rest of the placeholders */}
                    <View style={styles.rowSpaceBetween}>
                        <LoadingPlaceholder height={21} width={93} />
                        <LoadingPlaceholder height={21} width={39} />
                    </View>

                    <FlatList
                        data={[...Array(3).keys()]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={() => (
                            <LoadingPlaceholder height={164} width={200} borderRadius={20} />
                        )}
                        ItemSeparatorComponent={() => <View style={styles.gapMediumHorizontal} />}
                        keyExtractor={(item) => item.toString()}
                        contentContainerStyle={styles.horizontalList}
                    />

                    {/* Footer placeholders */}
                    <View style={styles.row}>
                        <LoadingPlaceholder height={26} width={129} />
                    </View>

                    <FlatList
                        data={[...Array(5).keys()]}
                        renderItem={() => (
                            <View>
                                <LoadingPlaceholder height={160} width={width - 40} borderRadius={4} />
                                <View style={styles.gapSmall} />
                                <LoadingPlaceholder height={18} width={130} />
                                <View style={styles.gapTiny} />
                                <View style={styles.rowSpaceBetween}>
                                    <LoadingPlaceholder height={18} width={57} />
                                    <LoadingPlaceholder height={16} width={84} />
                                </View>
                            </View>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.gapLarge} />}
                        keyExtractor={(item) => item.toString()}
                    />
                </LinearGradient>
                {/* <CustomTabBar /> */}
            </>}
            style={styles.container} />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        paddingHorizontal: 16,
    },
    contentContainer: {
        paddingTop: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    gapSmall: {
        height: 4,
    },
    gapSmallHorizontal: {
        width: 8,
    },
    gapMediumHorizontal: {
        width: 15,
    },
    gapLarge: {
        height: 16,
    },
    gapTiny: {
        height: 2,
    },
    horizontalList: {
        paddingVertical: 10,
    },
    gridColumnWrapper: {
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    gridItem: {
        marginVertical: 8,
    },
});

export default HomeLoadingPage;
