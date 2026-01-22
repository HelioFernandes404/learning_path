"""
Inventory management for k9s-config.

Handles loading and parsing Ansible-style inventory files with support
for custom YAML tags like !vault.
"""

import sys
import yaml
from pathlib import Path
from typing import Dict, Any, Optional


def load_inventories(inventory_path: Optional[Path] = None) -> Dict[str, Any]:
    """
    Load all *_hosts.yml from inventory/ directory.

    Args:
        inventory_path: Path to inventory directory (default: ./inventory)

    Returns:
        dict: {company_name: inventory_data}
    """
    if inventory_path is None:
        inventory_path = Path(__file__).parent.parent / "inventory"

    inventories: Dict[str, Any] = {}
    if not inventory_path.exists():
        return inventories

    # Custom YAML loader that ignores unknown tags (like !vault)
    class VaultIgnoreLoader(yaml.SafeLoader):
        pass

    def ignore_unknown_tag(loader: Any, tag_suffix: Any, node: Any) -> Any:
        if isinstance(node, yaml.MappingNode):
            return loader.construct_mapping(node)
        elif isinstance(node, yaml.SequenceNode):
            return loader.construct_sequence(node)
        else:
            return node.value

    VaultIgnoreLoader.add_multi_constructor('', ignore_unknown_tag)

    for inv_file in sorted(inventory_path.glob("*_hosts.yml")):
        company = inv_file.stem.replace("_hosts", "")
        try:
            with open(inv_file) as f:
                data = yaml.load(f, Loader=VaultIgnoreLoader)
                inventories[company] = data
        except Exception as e:
            print(f"Warning: Failed to load {inv_file}: {e}", file=sys.stderr)

    return inventories


def extract_hosts_from_inventory(inv_data: Any) -> Dict[str, Dict[str, Any]]:
    """
    Extract all hosts from an inventory structure.

    Args:
        inv_data: Parsed inventory YAML data

    Returns:
        dict: {host_name: {"group": str, "config": dict}}
    """
    hosts: Dict[str, Dict[str, Any]] = {}
    if not isinstance(inv_data, dict) or "all" not in inv_data:
        return hosts

    all_data = inv_data["all"]
    if "children" not in all_data:
        return hosts

    for group_name, group_data in all_data["children"].items():
        if isinstance(group_data, dict) and "hosts" in group_data:
            # Check if hosts is not None and is a dict
            hosts_data = group_data["hosts"]
            if hosts_data and isinstance(hosts_data, dict):
                for host_name, host_config in hosts_data.items():
                    hosts[host_name] = {
                        "group": group_name,
                        "config": host_config or {}
                    }

    return hosts
