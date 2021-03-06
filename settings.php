<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor pastespecial plugin settings.
 *
 * @package    atto_pastespecial
 * @copyright  2015 Joseph Inhofer
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$ADMIN->add('editoratto', new admin_category('atto_pastespecial', new lang_string('pluginname', 'atto_pastespecial')));

$settings = new admin_settingpage('atto_pastespecial_settings', new lang_string('settings', 'atto_pastespecial'));
if ($ADMIN->fulltree) {
    // Set the CSS properties to be used in pasting from Word.
    $name = new lang_string('wordCSS', 'atto_pastespecial');
    $desc = new lang_string('wordCSS_desc', 'atto_pastespecial');
    $default = new lang_string('wordCSS_default', 'atto_pastespecial');

    $setting = new admin_setting_configtextarea('atto_pastespecial/wordCSS',
                                              $name,
                                              $desc,
                                              $default,
                                              PARAM_TEXT,
                                              '50',
                                              '10');
    $settings->add($setting);

    // Set the CSS properties to be used in pasting from Google Documents.
    $name = new lang_string('gdocCSS', 'atto_pastespecial');
    $desc = new lang_string('gdocCSS_desc', 'atto_pastespecial');
    $default = new lang_string('gdocCSS_default', 'atto_pastespecial');

    $setting = new admin_setting_configtextarea('atto_pastespecial/gdocCSS',
                                              $name,
                                              $desc,
                                              $default,
                                              PARAM_TEXT,
                                              '50',
                                              '10');
    $settings->add($setting);

    // Set the CSS properties to be used in pasting from Libre.
    $name = new lang_string('libreCSS', 'atto_pastespecial');
    $desc = new lang_string('libreCSS_desc', 'atto_pastespecial');
    $default = new lang_string('libreCSS_default', 'atto_pastespecial');

    $setting = new admin_setting_configtextarea('atto_pastespecial/libreCSS',
                                              $name,
                                              $desc,
                                              $default,
                                              PARAM_TEXT,
                                              '50',
                                              '10');
    $settings->add($setting);

    // Set the CSS properties to be used in pasting from Other.
    $name = new lang_string('otherCSS', 'atto_pastespecial');
    $desc = new lang_string('otherCSS_desc', 'atto_pastespecial');

    $setting = new admin_setting_configtextarea('atto_pastespecial/otherCSS',
                                              $name,
                                              $desc,
                                              '',
                                              PARAM_TEXT,
                                              '50',
                                              '10');
    $settings->add($setting);
}
