import defaultConfig from './default.config.json';

class ConfigService {
  constructor() {
    this.config = { ...defaultConfig };
    this.loadConfig();
  }

  loadConfig() {
    try {
      const savedConfig = localStorage.getItem('pfbot_config');
      if (savedConfig) {
        this.config = { ...this.config, ...JSON.parse(savedConfig) };
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
  }

  saveConfig() {
    try {
      localStorage.setItem('pfbot_config', JSON.stringify(this.config));
    } catch (error) {
      console.error('Error saving config:', error);
    }
  }

  getConfig() {
    return this.config;
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.saveConfig();
  }

  // Network settings
  setRPC(rpc) {
    this.config.network.rpc = rpc;
    this.saveConfig();
  }

  setWS(ws) {
    this.config.network.ws = ws;
    this.saveConfig();
  }

  setBlockEngineUrl(url) {
    this.config.network.blockEngineUrl = url;
    this.saveConfig();
  }

  // Trading settings
  setDelay(delay) {
    this.config.trading.delay = parseInt(delay);
    this.saveConfig();
  }

  setSlippage(slippage) {
    this.config.trading.slippage = parseFloat(slippage);
    this.saveConfig();
  }

  setBuyLimits(minBuy, maxBuy, microBuyAmount) {
    this.config.trading.buyLimits = {
      minBuy: minBuy.toString(),
      maxBuy: maxBuy.toString(),
      microBuyAmount: microBuyAmount.toString()
    };
    this.saveConfig();
  }

  // Compute settings
  setComputeSettings(unit, limit) {
    this.config.compute = {
      computeUnit: unit.toString(),
      computeLimit: limit.toString()
    };
    this.saveConfig();
  }

  // JITO settings
  setJitoSettings(enabled, tipPK, tipAmount) {
    this.config.jito = {
      ...this.config.jito,
      enabled,
      tipPK,
      tipAmount: tipAmount.toString()
    };
    this.saveConfig();
  }

  // Wallet settings
  setWallets(sender, devWallet) {
    this.config.wallets = {
      sender,
      devWallet
    };
    this.saveConfig();
  }
}

export const configService = new ConfigService();