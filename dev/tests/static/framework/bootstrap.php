<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

use Magento\Framework\App\Utility\Files;
use Magento\Framework\Component\ComponentRegistrar;
use Magento\Framework\Component\DirSearch;
use Magento\Framework\Filesystem\Directory\ReadFactory;
use Magento\Framework\Filesystem\DriverPool;
use Magento\Framework\View\Design\Theme\ThemePackageList;
use Magento\Framework\View\Design\Theme\ThemePackageFactory;

require __DIR__ . '/autoload.php';

$componentRegistrar = new ComponentRegistrar();
$dirSearch = new DirSearch($componentRegistrar, new ReadFactory(new DriverPool()));
$themePackageList = new ThemePackageList($componentRegistrar, new ThemePackageFactory());
$regexIteratorFactory = new Magento\Framework\App\Utility\RegexIteratorFactory();
\Magento\Framework\App\Utility\Files::setInstance(
    new Files($componentRegistrar, $dirSearch, $themePackageList, $regexIteratorFactory)
);
