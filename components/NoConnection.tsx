import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';

interface Props {
    error?: { code?: number|string, message: string };
    refresh: () => void;
}

const NoConnection: React.FC<Props> = ({ refresh, error }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textBox}>
                <Text style={styles.text}>Oops! Connection Error</Text>
                <Text style={styles.subTextErr}>{error?.code} - {error?.message}</Text>
                <Text style={styles.subText}>Check your network connection and try again.</Text>
                <Button title="Retry" onPress={refresh} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    textBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: 'red',
        borderRadius: 40,
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "white"
    },
    subTextErr: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
        color: "white",
        fontWeight: 'semibold',
        fontStyle: 'italic'
    },
    subText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: "white"
    },
});

export default NoConnection;