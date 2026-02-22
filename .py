import os

search_name = input("Enter file or folder name to search: ")

drives = ["C:\\", "D:\\"]  # drives to search
found = False

for drive in drives:
    print(f"\nSearching in {drive} ...\n")
    for root, dirs, files in os.walk(drive):
        # check folders
        for d in dirs:
            if search_name.lower() == d.lower():
                print("Folder found at:", os.path.join(root, d))
                found = True

        # check files
        for f in files:
            if search_name.lower() == f.lower():
                print("File found at:", os.path.join(root, f))
                found = True

if not found:
    print("\nNo file or folder found with that name.")
