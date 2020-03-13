# This script needs python3

import concurrent.futures
import os, shutil
from optparse import OptionParser

parser = OptionParser()
parser.add_option("-d","--dest-path", dest="destPath",
                 help="Destination folder path")
parser.add_option("-f", "--file-list", dest="fileList",
                  help="List of files top be copied")
(options, args) = parser.parse_args()

src_path = os.getcwd()
dest_path = options.destPath

with open(options.fileList, 'r') as fp:
    lines = fp.readlines()

def copy_file(filename):
    filename = filename.rstrip()
    src_file_path = os.path.join(src_path, filename)
    dest_file_path = os.path.join(dest_path, filename)
    try:
        shutil.copy2(src_file_path, dest_file_path)
    except IOError as io_err:
        os.makedirs(os.path.dirname(dest_file_path))
        shutil.copy2(src_file_path, dest_file_path)
    finally:
        return dest_file_path

with concurrent.futures.ProcessPoolExecutor() as executor:
    for src_file, dest_file in zip(lines, executor.map(copy_file, lines)):
        #print('%s copied to: %s' % (src_file.rstrip(), dest_file))
        pass