# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
$install_puppet = <<-PUPPET
sudo apt-get update -y
sudo apt-get install -y puppet
sudo apt-get install -y net-tools
sudo apt-get install -y nodejs npm
sudo npm install -g express

# Instalación de Consul
CONSUL_VERSION="1.14.0"
curl -O https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip
sudo unzip consul_${CONSUL_VERSION}_linux_amd64.zip -d /usr/local/bin/
rm consul_${CONSUL_VERSION}_linux_amd64.zip
sudo mkdir -p /etc/consul.d
sudo chmod a+w /etc/consul.d
PUPPET

Vagrant.configure("2") do |config|
  # Configuración para clienteUbuntu
  config.vm.define :clienteUbuntu do |clienteUbuntu|
    clienteUbuntu.vm.box = "bento/ubuntu-22.04"
    clienteUbuntu.vm.network :private_network, ip: "192.168.100.2"
    clienteUbuntu.vm.hostname = "clienteUbuntu"
    clienteUbuntu.vm.synced_folder ".", "/vagrant"
    clienteUbuntu.vm.provision "shell", inline: $install_puppet
    clienteUbuntu.vm.provision :puppet do |puppet|
      puppet.manifests_path = "puppet/manifests"
      puppet.manifest_file = "site.pp"
      puppet.module_path = "puppet/modules"
    end
  end

  # Configuración para servidorUbuntu
  config.vm.define :servidorUbuntu do |servidorUbuntu|
    servidorUbuntu.vm.box = "bento/ubuntu-22.04"
    servidorUbuntu.vm.network :private_network, ip: "192.168.100.3"
    servidorUbuntu.vm.hostname = "servidorUbuntu"
    servidorUbuntu.vm.synced_folder ".", "/vagrant"
    servidorUbuntu.vm.provision "shell", inline: $install_puppet
    servidorUbuntu.vm.provision :puppet do |puppet|
      puppet.manifests_path = "puppet/manifests"
      puppet.manifest_file = "site.pp"
      puppet.module_path = "puppet/modules"
    end
  end

  # Configuración para usuarioUbuntu
  config.vm.define :usuarioUbuntu do |usuarioUbuntu|
    usuarioUbuntu.vm.box = "bento/ubuntu-22.04"
    usuarioUbuntu.vm.network :private_network, ip: "192.168.100.4"
    usuarioUbuntu.vm.hostname = "usuarioUbuntu"
    usuarioUbuntu.vm.synced_folder ".", "/vagrant"
    usuarioUbuntu.vm.provision "shell", inline: $install_puppet
    usuarioUbuntu.vm.provision :puppet do |puppet|
      puppet.manifests_path = "puppet/manifests"
      puppet.manifest_file = "site.pp"
      puppet.module_path = "puppet/modules"
    end
  end

  # Configuración para aproxy (balanceador HAProxy)
  config.vm.define :aproxy do |aproxy|
    aproxy.vm.box = "bento/ubuntu-22.04"
    aproxy.vm.network :private_network, ip: "192.168.100.5"
    aproxy.vm.hostname = "aproxy"
    aproxy.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y haproxy
      # Instalación de Consul en aproxy
      CONSUL_VERSION="1.14.0"
      curl -O https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip
      sudo unzip consul_${CONSUL_VERSION}_linux_amd64.zip -d /usr/local/bin/
      rm consul_${CONSUL_VERSION}_linux_amd64.zip
      sudo mkdir -p /etc/consul.d
      sudo chmod a+w /etc/consul.d
    SHELL
  end
end
