/**
 * Created by GP on 16/12/20.
 */
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    Platform,
    StyleSheet,
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: (Platform.OS === 'ios') ? 64 : 44,
    },
});
const StatusBarManager = require('NativeModules').StatusBarManager;
var deviceHeight = Platform.OS == "ios" ? Dimensions.get('window').height : Dimensions.get('window').height - StatusBarManager.HEIGHT;
var deviceWidth = Dimensions.get('window').width;
var perWidth = deviceWidth / 375;
export default class extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            imageUrl: this.props.url,
            imageHeight: deviceHeight,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({imageUrl: props.url});
    }

    componentDidMount() {
        var _this = this;
        Image.getSize(this.state.imageUrl, function (width, height) {
            _this.setState({
                imageHeight: perWidth * height / 2,
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <Image source={{uri: this.state.imageUrl}} style={{
                        width: deviceWidth,
                        height: this.state.imageHeight
                    }}></Image>
                </ScrollView>
            </View>
        )
    }
};