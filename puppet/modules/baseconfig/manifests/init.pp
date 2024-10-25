class baseconfig {
  exec { 'apt-get update':
    command => '/usr/bin/apt-get update';
  }

  package { ['apache2', 'tree']:
    ensure => present;
  }

  # Configuración específica según el hostname
  case $facts['networking']['hostname'] {
    'servidorUbuntu': {
      file { '/var/www/html/miaplicacion':
        ensure => 'directory',
        owner  => 'root',
        group  => 'root',
        mode   => '0755',
      }

      file { '/var/www/html/miaplicacion/index.js':
        ensure  => present,
        owner   => 'root',
        group   => 'root',
        mode    => '0644',
        source  => 'puppet:///modules/baseconfig/index.js',
        require => File['/var/www/html/miaplicacion'],
      }
    }

    'clienteUbuntu': {
      file { '/var/www/html/miaplicacion':
        ensure => 'directory',
        owner  => 'root',
        group  => 'root',
        mode   => '0755',
      }

      file { '/var/www/html/miaplicacion/app.js':
        ensure  => present,
        owner   => 'root',
        group   => 'root',
        mode    => '0644',
        source  => 'puppet:///modules/baseconfig/app.js',
        require => File['/var/www/html/miaplicacion'],
      }
    }
    default: {
      notice('No se requiere configuración específica para este host.')
    }
  }

  service { 'apache2':
    ensure  => running,
    enable  => true,
    require => Package['apache2'];
  }
}
