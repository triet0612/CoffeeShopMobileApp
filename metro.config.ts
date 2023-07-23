import { getDefaultConfig } from 'expo/metro-config';

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db', 'png');

module.exports = defaultConfig;
